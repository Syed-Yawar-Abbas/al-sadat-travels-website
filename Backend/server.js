const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Paths to data files
const flightsPath = path.join(__dirname, 'flights.json');
const usersPath = path.join(__dirname, 'users.json');
const servicesPath = path.join(__dirname, 'services.json');

// Helper function to read JSON files
function readJSON(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Helper function to write JSON files
function writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Initialize services data if not exists
if (!fs.existsSync(servicesPath)) {
    const initialServices = {
        flights: [],
        groups: [],
        umrah: [],
        hotels: [],
        holidays: [],
        visas: []
    };
    writeJSON(servicesPath, initialServices);
}

// Routes

// Get all services
app.get('/api/services', (req, res) => {
    try {
        const services = readJSON(servicesPath);
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// Get specific service type
app.get('/api/services/:type', (req, res) => {
    try {
        const services = readJSON(servicesPath);
        const type = req.params.type;
        if (services[type]) {
            res.json(services[type]);
        } else {
            res.status(404).json({ error: 'Service type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// Add new service (admin only)
app.post('/api/services/:type', (req, res) => {
    const { token } = req.body;

    // Simple token check (in real app, use JWT)
    if (token !== 'admin-token') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    try {
        const services = readJSON(servicesPath);
        const type = req.params.type;

        if (!services[type]) {
            return res.status(404).json({ error: 'Service type not found' });
        }

        const newService = {
            id: services[type].length + 1,
            ...req.body
        };
        delete newService.token; // Remove token from service data

        services[type].push(newService);
        writeJSON(servicesPath, services);
        res.json(newService);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add service' });
    }
});

// Update service (admin only)
app.put('/api/services/:type/:id', (req, res) => {
    const { token } = req.body;

    if (token !== 'admin-token') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    try {
        const services = readJSON(servicesPath);
        const type = req.params.type;
        const id = parseInt(req.params.id);

        if (!services[type]) {
            return res.status(404).json({ error: 'Service type not found' });
        }

        const serviceIndex = services[type].findIndex(s => s.id === id);
        if (serviceIndex === -1) {
            return res.status(404).json({ error: 'Service not found' });
        }

        const updatedService = {
            ...services[type][serviceIndex],
            ...req.body
        };
        delete updatedService.token;

        services[type][serviceIndex] = updatedService;
        writeJSON(servicesPath, services);
        res.json(updatedService);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update service' });
    }
});

// Delete service (admin only)
app.delete('/api/services/:type/:id', (req, res) => {
    const { token } = req.query;

    if (token !== 'admin-token') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    try {
        const services = readJSON(servicesPath);
        const type = req.params.type;
        const id = parseInt(req.params.id);

        if (!services[type]) {
            return res.status(404).json({ error: 'Service type not found' });
        }

        const serviceIndex = services[type].findIndex(s => s.id === id);
        if (serviceIndex === -1) {
            return res.status(404).json({ error: 'Service not found' });
        }

        services[type].splice(serviceIndex, 1);
        writeJSON(servicesPath, services);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete service' });
    }
});

// Legacy flight routes for backward compatibility
app.get('/api/flights', (req, res) => {
    try {
        const services = readJSON(servicesPath);
        res.json(services.flights || []);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch flights' });
    }
});

app.post('/api/flights', (req, res) => {
    const { token, ...flightData } = req.body;

    if (token !== 'admin-token') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    try {
        const services = readJSON(servicesPath);
        const newFlight = {
            id: (services.flights || []).length + 1,
            ...flightData
        };

        if (!services.flights) services.flights = [];
        services.flights.push(newFlight);
        writeJSON(servicesPath, services);
        res.json(newFlight);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add flight' });
    }
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    try {
        const users = readJSON(usersPath);
        const user = users.find(u => u.email === email);

        if (user && bcrypt.compareSync(password, user.password)) {
            res.json({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    isAdmin: user.isAdmin
                },
                token: user.isAdmin ? 'admin-token' : 'user-token'
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Register new user
app.post('/api/register', (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        const users = readJSON(usersPath);
        const existingUser = users.find(u => u.email === email);

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = {
            id: users.length + 1,
            name,
            email,
            phone,
            password: hashedPassword,
            isAdmin: false
        };
        users.push(newUser);
        writeJSON(usersPath, users);

        res.json({
            success: true,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin
            },
            token: 'user-token'
        });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
