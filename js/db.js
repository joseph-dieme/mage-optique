/* Mage Optique & Services - Local & Supabase Hybrid Database System */

const DEFAULT_PRODUCTS = [];

const DB_KEY = 'mage_optique_services_products';
const APPT_DB_KEY = 'mage_optique_appointments';
const ORDER_DB_KEY = 'mage_optique_orders';
const DEVIS_DB_KEY = 'mage_optique_devis';

/* --- Supabase SDK Dynamic Loading & Initialization --- */
let _supabaseClient = null;

async function getSupabase() {
    if (_supabaseClient) return _supabaseClient;
    
    // Inject dynamic CDN load if window.supabase is undefined
    if (typeof supabase === 'undefined') {
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    const supabaseUrl = 'https://psizngczubktsfxioofh.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzaXpuZ2N6dWJrdHNmeGlvb2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODcwODksImV4cCI6MjA5NjA2MzA4OX0.SkYF2NfgJM5ubgIk84CTTYm9PrD4-QtxviaBNBvr8Mw';
    _supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
    return _supabaseClient;
}

// Background sync from Supabase database to LocalStorage cache
async function syncDatabaseFromSupabase() {
    try {
        const client = await getSupabase();
        
        // 1. Sync Products
        const { data: dbProducts, error: prodErr } = await client.from('products').select('*').order('created_at', { ascending: true });
        if (!prodErr && dbProducts) {
            const mapped = dbProducts.map(p => ({
                id: p.id,
                title: p.title,
                category: p.category,
                gender: p.gender,
                price: parseFloat(p.price) || 0,
                tag: p.tag,
                desc: p.description,
                specs: p.specs,
                image: p.image,
                homepage_placement: p.homepage_placement
            }));
            localStorage.setItem(DB_KEY, JSON.stringify(mapped));
        }

        // 2. Sync Appointments (Filter by user if logged in, or fetch all for admin)
        const role = localStorage.getItem('mage_optique_client_role');
        const userId = localStorage.getItem('mage_optique_user_id');
        
        let apptsQuery = client.from('appointments').select('*');
        if (role !== 'admin' && userId) {
            apptsQuery = apptsQuery.eq('user_id', userId);
        }
        const { data: dbAppts, error: apptErr } = await apptsQuery;
        if (!apptErr && dbAppts) {
            localStorage.setItem(APPT_DB_KEY, JSON.stringify(dbAppts));
        }

        // 3. Sync Orders (Filter by user if logged in, or fetch all for admin)
        let ordersQuery = client.from('orders').select('*');
        if (role !== 'admin' && userId) {
            ordersQuery = ordersQuery.eq('user_id', userId);
        }
        const { data: dbOrders, error: orderErr } = await ordersQuery;
        if (!orderErr && dbOrders) {
            localStorage.setItem(ORDER_DB_KEY, JSON.stringify(dbOrders));
        }

        // 4. Sync Devis
        let devisQuery = client.from('devis').select('*');
        if (role !== 'admin' && userId) {
            devisQuery = devisQuery.eq('user_id', userId);
        }
        const { data: dbDevis, error: devisErr } = await devisQuery;
        if (!devisErr && dbDevis) {
            localStorage.setItem(DEVIS_DB_KEY, JSON.stringify(dbDevis));
        }

        // Dispatch sync event
        window.dispatchEvent(new CustomEvent('supabase-synced'));
    } catch (e) {
        console.error("Database synchronization failed:", e);
    }
}

// Initialize realtime listeners for database updates
async function initRealtimeSubscriptions() {
    try {
        const client = await getSupabase();
        
        // Subscribe to changes on products, appointments, orders, and devis
        client.channel('realtime-db-sync')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
                console.log("Realtime: products changed", payload);
                syncDatabaseFromSupabase();
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, (payload) => {
                console.log("Realtime: appointments changed", payload);
                syncDatabaseFromSupabase();
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
                console.log("Realtime: orders changed", payload);
                syncDatabaseFromSupabase();
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'devis' }, (payload) => {
                console.log("Realtime: devis changed", payload);
                syncDatabaseFromSupabase();
            })
            .subscribe((status) => {
                console.log("Supabase realtime channel subscription status:", status);
            });
    } catch (e) {
        console.error("Failed to initialize realtime subscriptions:", e);
    }
}

// Start database sync and realtime subscriptions on initialization
getSupabase().then(() => {
    syncDatabaseFromSupabase();
    initRealtimeSubscriptions();
}).catch(err => {
    console.error("Failed to load Supabase SDK on start:", err);
});

/* --- Products CRUD Controller --- */

function getProducts() {
    const data = localStorage.getItem(DB_KEY);
    if (!data) {
        localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_PRODUCTS));
        return DEFAULT_PRODUCTS;
    }
    return JSON.parse(data);
}

function saveProducts(products) {
    try {
        localStorage.setItem(DB_KEY, JSON.stringify(products));
    } catch (e) {
        console.error("Local storage quota exceeded for products:", e);
    }
}

async function addProduct(product) {
    const products = getProducts();
    const newProduct = {
        id: 'prod-' + Date.now(),
        title: product.title,
        category: product.category,
        gender: product.gender || "homme",
        price: parseInt(product.price) || 0,
        tag: product.tag || "Nouveau",
        desc: product.desc || "Aucune description fournie.",
        specs: product.specs || "Ajustable standard",
        image: product.image || "",
        homepage_placement: product.homepage_placement || null
    };

    products.push(newProduct);
    saveProducts(products);

    try {
        const client = await getSupabase();
        const { error } = await client.from('products').insert([{
            id: newProduct.id,
            title: newProduct.title,
            category: newProduct.category,
            gender: newProduct.gender,
            price: newProduct.price,
            tag: newProduct.tag,
            description: newProduct.desc,
            specs: newProduct.specs,
            image: newProduct.image,
            homepage_placement: newProduct.homepage_placement
        }]);
        if (error) throw new Error(error.message);
    } catch (e) {
        console.error("Failed to add product to Supabase:", e);
        alert("Erreur de sauvegarde en base de données : " + e.message);
    }
    return newProduct;
}

async function updateProduct(id, updatedFields) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = {
            ...products[index],
            ...updatedFields,
            price: parseInt(updatedFields.price) || products[index].price
        };
        saveProducts(products);

        try {
            const client = await getSupabase();
            const { error } = await client.from('products').update({
                title: products[index].title,
                category: products[index].category,
                gender: products[index].gender,
                price: products[index].price,
                tag: products[index].tag,
                description: products[index].desc,
                specs: products[index].specs,
                image: products[index].image,
                homepage_placement: products[index].homepage_placement
            }).eq('id', id);
            if (error) throw new Error(error.message);
        } catch (e) {
            console.error("Failed to update product in Supabase:", e);
            alert("Erreur de modification en base de données : " + e.message);
        }
        return products[index];
    }
    return null;
}

async function deleteProduct(id) {
    const products = getProducts();
    const filtered = products.filter(p => p.id !== id);
    saveProducts(filtered);

    try {
        const client = await getSupabase();
        await client.from('products').delete().eq('id', id);
    } catch (e) {
        console.error("Failed to delete product in Supabase:", e);
    }
    return filtered;
}

/* --- Appointments Controller --- */

function getAppointments() {
    const data = localStorage.getItem(APPT_DB_KEY);
    return data ? JSON.parse(data) : [];
}

function saveAppointments(appts) {
    try {
        localStorage.setItem(APPT_DB_KEY, JSON.stringify(appts));
    } catch (e) {
        console.error("Local storage quota exceeded for appointments:", e);
    }
}

async function addAppointment(appt) {
    const appts = getAppointments();
    const newAppt = {
        id: 'appt-' + Date.now(),
        service: appt.service,
        date: appt.date,
        time: appt.time,
        name: appt.name,
        email: appt.email,
        phone: appt.phone,
        status: 'En attente'
    };
    appts.push(newAppt);
    saveAppointments(appts);

    try {
        const client = await getSupabase();
        const userId = localStorage.getItem('mage_optique_user_id') || null;
        await client.from('appointments').insert([{
            id: newAppt.id,
            service: newAppt.service,
            date: newAppt.date,
            time: newAppt.time,
            name: newAppt.name,
            email: newAppt.email,
            phone: newAppt.phone,
            status: newAppt.status,
            user_id: userId
        }]);
    } catch (e) {
        console.error("Failed to insert appointment in Supabase:", e);
    }
    return newAppt;
}

async function updateAppointmentStatus(id, status) {
    const appts = getAppointments();
    const index = appts.findIndex(a => a.id === id);
    if (index !== -1) {
        appts[index].status = status;
        saveAppointments(appts);

        try {
            const client = await getSupabase();
            await client.from('appointments').update({ status }).eq('id', id);
        } catch (e) {
            console.error("Failed to update appointment status in Supabase:", e);
        }
        return appts[index];
    }
    return null;
}

async function deleteAppointment(id) {
    const appts = getAppointments();
    const filtered = appts.filter(a => a.id !== id);
    saveAppointments(filtered);

    try {
        const client = await getSupabase();
        await client.from('appointments').delete().eq('id', id);
    } catch (e) {
        console.error("Failed to delete appointment in Supabase:", e);
    }
    return filtered;
}

/* --- Orders Controller --- */

function getOrders() {
    const data = localStorage.getItem(ORDER_DB_KEY);
    return data ? JSON.parse(data) : [];
}

function saveOrders(orders) {
    try {
        localStorage.setItem(ORDER_DB_KEY, JSON.stringify(orders));
    } catch (e) {
        console.error("Local storage quota exceeded for orders:", e);
    }
}

async function addOrder(order) {
    const orders = getOrders();
    const newOrder = {
        id: 'order-' + Date.now(),
        name: order.name,
        email: order.email,
        phone: order.phone,
        address: order.address,
        payment: order.payment,
        items: order.items,
        subtotal: order.subtotal,
        shipping: order.shipping,
        total: order.total,
        status: 'En attente',
        date: new Date().toISOString().split('T')[0]
    };
    orders.push(newOrder);
    saveOrders(orders);

    try {
        const client = await getSupabase();
        const userId = localStorage.getItem('mage_optique_user_id') || null;
        await client.from('orders').insert([{
            id: newOrder.id,
            name: newOrder.name,
            email: newOrder.email,
            phone: newOrder.phone,
            address: newOrder.address,
            payment: newOrder.payment,
            items: newOrder.items,
            subtotal: newOrder.subtotal,
            shipping: newOrder.shipping,
            total: newOrder.total,
            status: newOrder.status,
            date: newOrder.date,
            user_id: userId
        }]);
    } catch (e) {
        console.error("Failed to add order to Supabase:", e);
    }
    return newOrder;
}

async function updateOrderStatus(id, status) {
    const orders = getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
        orders[index].status = status;
        saveOrders(orders);

        try {
            const client = await getSupabase();
            await client.from('orders').update({ status }).eq('id', id);
        } catch (e) {
            console.error("Failed to update order status in Supabase:", e);
        }
        return orders[index];
    }
    return null;
}

async function deleteOrder(id) {
    const orders = getOrders();
    const filtered = orders.filter(o => o.id !== id);
    saveOrders(filtered);

    try {
        const client = await getSupabase();
        await client.from('orders').delete().eq('id', id);
    } catch (e) {
        console.error("Failed to delete order from Supabase:", e);
    }
    return filtered;
}

/* --- Devis Controller --- */

function getMockPrescriptionSVG(lastname, firstname, lensType) {
    const lensLabel = lensType === 'progressifs' ? 'Verres Progressifs' : (lensType === 'fatigue' ? 'Verres Anti-fatigue' : 'Verres Unifocaux');
    const sphereD = lensType === 'progressifs' ? '-2.75' : '-1.50';
    const sphereG = lensType === 'progressifs' ? '-2.50' : '-1.25';
    const add = lensType === 'progressifs' ? ' | Addition: +1.75' : '';
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
    <rect width="100%" height="100%" fill="#faf8f5" rx="16"/>
    <rect x="20" y="20" width="560" height="760" fill="none" stroke="#d4af37" stroke-width="2" rx="12"/>
    <text x="50" y="80" font-family="'Playfair Display', serif" font-size="28" font-weight="bold" fill="#1c2020">Dr. Marc-Antoine Roche</text>
    <text x="50" y="105" font-family="'Hanken Grotesk', sans-serif" font-size="14" fill="#a48c54" letter-spacing="1">OPHTALMOLOGISTE - CLINIQUE DU REGARD</text>
    <text x="50" y="125" font-family="'Hanken Grotesk', sans-serif" font-size="12" fill="#5f6969">32 Rue de la République, Dakar | Tél: 33 821 45 45</text>
    <line x1="50" y1="145" x2="550" y2="145" stroke="#e0d6c3" stroke-width="1"/>
    
    <text x="50" y="190" font-family="'Hanken Grotesk', sans-serif" font-size="14" font-weight="bold" fill="#1c2020">Patient / Patiente :</text>
    <text x="180" y="190" font-family="'Hanken Grotesk', sans-serif" font-size="14" fill="#5f6969">Mme/M. ${firstname} ${lastname}</text>
    <text x="50" y="215" font-family="'Hanken Grotesk', sans-serif" font-size="14" font-weight="bold" fill="#1c2020">Date d'Examen :</text>
    <text x="180" y="215" font-family="'Hanken Grotesk', sans-serif" font-size="14" fill="#5f6969">02 Juin 2026</text>
    
    <line x1="50" y1="240" x2="550" y2="240" stroke="#e0d6c3" stroke-width="1"/>
    
    <text x="50" y="280" font-family="'Playfair Display', serif" font-size="22" font-style="italic" font-weight="bold" fill="#a48c54">Ordonnance Optique</text>
    
    <rect x="50" y="310" width="500" height="90" fill="#f4f0e6" rx="8"/>
    <text x="70" y="340" font-family="'Hanken Grotesk', sans-serif" font-size="16" font-weight="bold" fill="#1c2020">ŒIL DROIT (OD)</text>
    <text x="70" y="375" font-family="'Hanken Grotesk', sans-serif" font-size="15" fill="#5f6969">Sphère: ${sphereD} | Cylindre: +0.50 | Axe: 95°${add}</text>
    
    <rect x="50" y="420" width="500" height="90" fill="#f4f0e6" rx="8"/>
    <text x="70" y="450" font-family="'Hanken Grotesk', sans-serif" font-size="16" font-weight="bold" fill="#1c2020">ŒIL GAUCHE (OG)</text>
    <text x="70" y="485" font-family="'Hanken Grotesk', sans-serif" font-size="15" fill="#5f6969">Sphère: ${sphereG} | Cylindre: +0.25 | Axe: 85°${add}</text>
    
    <text x="50" y="550" font-family="'Hanken Grotesk', sans-serif" font-size="14" font-weight="bold" fill="#1c2020">Notes cliniques :</text>
    <text x="50" y="575" font-family="'Hanken Grotesk', sans-serif" font-size="13" fill="#5f6969">${lensLabel} conseillés avec traitement antireflet premium.</text>
    <text x="50" y="595" font-family="'Hanken Grotesk', sans-serif" font-size="13" fill="#5f6969">Port recommandé pour toutes les activités professionnelles.</text>
    
    <line x1="50" y1="630" x2="550" y2="630" stroke="#e0d6c3" stroke-width="1"/>
    
    <rect x="360" y="650" width="190" height="100" fill="none" stroke="#2b4570" stroke-width="1" stroke-dasharray="4,4" rx="4"/>
    <text x="375" y="675" font-family="'Playfair Display', serif" font-size="13" font-weight="bold" fill="#2b4570">MARQUAGE ET CACHET</text>
    <text x="375" y="695" font-family="'Hanken Grotesk', sans-serif" font-size="11" fill="#2b4570">Clinique du Regard</text>
    <text x="375" y="710" font-family="'Hanken Grotesk', sans-serif" font-size="11" fill="#2b4570">Dr. Marc-Antoine Roche</text>
    <text x="375" y="725" font-family="'Hanken Grotesk', sans-serif" font-size="10" fill="#2b4570">N° d'Ordre : 954871</text>
    
    <text x="50" y="750" font-family="'Hanken Grotesk', sans-serif" font-size="11" fill="#a48c54">Document original généré par le portail Mage Optique &amp; Services</text>
</svg>`;
    
    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
}

function getDevis() {
    const data = localStorage.getItem(DEVIS_DB_KEY);
    return data ? JSON.parse(data) : [];
}

function saveDevis(devisList) {
    try {
        localStorage.setItem(DEVIS_DB_KEY, JSON.stringify(devisList));
    } catch (e) {
        console.error("Local storage quota exceeded for devis:", e);
    }
}

async function addDevis(devis) {
    const devisList = getDevis();
    const newDevis = {
        id: 'devis-' + Date.now(),
        lastname: devis.lastname,
        firstname: devis.firstname,
        email: devis.email,
        lens: devis.lens,
        insurance: devis.insurance || '',
        fileName: devis.fileName || 'Ordonnance.pdf',
        fileData: devis.fileData || '',
        status: 'En attente',
        date: new Date().toISOString().split('T')[0]
    };
    devisList.push(newDevis);
    saveDevis(devisList);

    try {
        const client = await getSupabase();
        const userId = localStorage.getItem('mage_optique_user_id') || null;
        await client.from('devis').insert([{
            id: newDevis.id,
            lastname: newDevis.lastname,
            firstname: newDevis.firstname,
            email: newDevis.email,
            lens: newDevis.lens,
            insurance: newDevis.insurance,
            file_name: newDevis.fileName,
            file_data: newDevis.fileData,
            status: newDevis.status,
            date: newDevis.date,
            user_id: userId
        }]);
    } catch (e) {
        console.error("Failed to insert devis in Supabase:", e);
    }
    return newDevis;
}

async function updateDevisStatus(id, status) {
    const devisList = getDevis();
    const index = devisList.findIndex(d => d.id === id);
    if (index !== -1) {
        devisList[index].status = status;
        saveDevis(devisList);

        try {
            const client = await getSupabase();
            await client.from('devis').update({ status }).eq('id', id);
        } catch (e) {
            console.error("Failed to update devis status in Supabase:", e);
        }
        return devisList[index];
    }
    return null;
}

async function deleteDevis(id) {
    const devisList = getDevis();
    const filtered = devisList.filter(d => d.id !== id);
    saveDevis(filtered);

    try {
        const client = await getSupabase();
        await client.from('devis').delete().eq('id', id);
    } catch (e) {
        console.error("Failed to delete devis in Supabase:", e);
    }
    return filtered;
}
