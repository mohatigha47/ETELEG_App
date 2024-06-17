// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Project = require('./models/project');
const Product = require('./models/product');

const cors = require('cors')
dotenv.config();

// Create an instance of express
const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(cors());


// Define the PORT
const PORT = process.env.PORT || 3001;

// Connect to MongoDB and start the server
mongoose.connect(process.env.DB)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.log(err));


// Define a route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.put('/addUser', async (req, res) => {
    const { fullName, email,role, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // If user does not exist, create and save the new user
        const newUser = new User({
            fullName,
            email,
            role,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save user.' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Compare the password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed.' });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});

// GET user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update User Route
app.put('/updateUser/:id', async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.send(updatedUser);
    } catch (error) {
        res.status(400).send({ error: 'Error updating user', details: error.message });
    }
});



app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch projects.' });
    }
});

// GET project by ID
app.get('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


// Route to add a project
app.post('/addProject', async (req, res) => {
    const { name, client, status, startDate, endDate, description } = req.body;

    try {
        const newProject = new Project({
            name,
            client,
            status,
            startDate,
            endDate,
            description
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save project.' });
    }
});

// Route to update a project
app.put('/updateProject/:id', async (req, res) => {
    const { id } = req.params;
    const { name, client, status, startDate, endDate, description } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { name, client, status, startDate, endDate, description },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        res.json(updatedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update project.' });
    }
});

// Route to delete a project
app.delete('/deleteProject/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        res.json({ message: 'Project deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete project.' });
    }
});


app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/addProduct', async (req, res) => {
    const { name, quantity, price, description } = req.body;
    const newProduct = new Product({ name, quantity, price, description });
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/updateProduct/:id', async (req, res) => {
    const { name, quantity, price, description } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, quantity, price, description },
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

