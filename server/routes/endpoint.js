const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// Removed bcrypt
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const Courier = require('../models/courierModel');
const Admin = require('../models/adminModel');

// Register new user without bcrypt
router.post('/users', async (req, res) => {
    try {
        const { email, password, ...rest } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: 'User already exists' });

        // Store password as plain text (not secure)
        const newUser = new User({ ...rest, email, password });
        await newUser.save();

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin
        const admin = await Admin.findOne({ email });
        if (admin) {
            if (password === admin.password) {
                return res.status(200).json({ who: 'admin' });
            } else {
                return res.status(401).json({ message: 'Invalid admin credentials' });
            }
        }

        // Check if user
        const user = await User.findOne({ email });
        if (!user || password !== user.password) {
            return res.status(401).json({ message: 'Invalid user credentials' });
        }

        res.status(200).json({
            who: 'user',
            userId: user._id,
            uname: user.uname,
            email: user.email
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/couriers', async (req, res) => {
    try {
        const { formData, userId } = req.body;
        const pickupDate = new Date(formData.pickup_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (pickupDate <= today) {
            return res.status(400).json({ message: 'Pickup date must be after today' });
        }

        const deliveryDate = new Date(pickupDate);
        deliveryDate.setDate(deliveryDate.getDate() + 3);

        const weight = parseFloat(formData.courier_weight);
        let charges = 0;
        if (weight <= 0.5) {
            charges = 100;
        } else if (weight <= 1) {
            charges = 120;
        } else if (weight <= 2) {
            charges = 150;
        } else if (weight <= 5) {
            charges = 250;
        } else if (weight <= 10) {
            charges = 500;
        } else {
            charges = 700;
        }

        const newCourier = new Courier({
            ...formData,
            sender_id: userId,
            pickup_date: pickupDate,
            delivery_date: deliveryDate,
            charges,
            delivery_status: 'Pending'
        });

        await newCourier.save();
        res.status(201).json({ message: 'Courier created successfully', courier: newCourier });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create courier' });
    }
});


router.get('/user/couriers/:id', async (req, res) => {
    try {
        const userId = req.body;
        console.log(req.params.id)
        console.log("check 1")
        const couriers = await Courier.find({ sender_id: req.params.id });
        console.log("check 2")
        res.status(200).json(couriers);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch courier history' });
    }
});

router.get("/couriers", async (req, res) => {
    try {
        const couriers = await Courier.find();
        res.status(200).json(couriers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching courier' });
    }
})

// Get courier stats for admin dashboard
router.get('/api/stats', async (req, res) => {
    try {
        const stats = [
            { title: 'Total Courier', count: await Courier.countDocuments() },
            { title: 'Total Courier Pickup', count: await Courier.countDocuments({ delivery_status: 'Picked Up' }) },
            { title: 'Intransit Courier', count: await Courier.countDocuments({ delivery_status: 'In Transit' }) },
            { title: 'Arrived at Destination', count: await Courier.countDocuments({ delivery_status: 'Arrived at Destination' }) },
            { title: 'Out for Delivery', count: await Courier.countDocuments({ delivery_status: 'Out for Delivery' }) },
            { title: 'Delivered Courier', count: await Courier.countDocuments({ delivery_status: 'Delivered' }) },
        ];
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: 'Failed to load stats' });
    }
});

router.get('/api/couriers/:id', async (req, res) => {
    try {
        const courier = await Courier.findById(req.params.id);
        if (!courier) return res.status(404).json({ message: 'Courier not found' });
        res.status(200).json(courier);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching courier' });
    }
});

// GET /api/couriers?status=In Transit
router.get('/api/couriers', async (req, res) => {
    try {
        const { status } = req.query;
        console.log(status)

        const filter = status ? { delivery_status: status } : {};

        const couriers = await Courier.find(filter);
        console.log(couriers);
        res.status(200).json(couriers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching couriers' });
    }
});

// router.put('/api/couriers/:id/status', async (req, res) => {
//   try {
//     const { status } = req.body;
//     await courierModel.findByIdAndUpdate(req.params.id, {
//       delivery_status: status
//     });
//     res.status(200).json({ message: 'Status updated' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating status' });
//   }
// });


router.put('/api/couriers/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedCourier = await Courier.findByIdAndUpdate(
            id,
            { delivery_status: status },
            { new: true, runValidators: true }
        );

        if (!updatedCourier) {
            return res.status(404).json({ error: 'Courier not found' });
        }

        res.status(200).json({ message: 'Status updated successfully', courier: updatedCourier });
    } catch (error) {
        console.error('Error updating courier status:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
