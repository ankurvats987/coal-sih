import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

const router = Router();

// Register
router.post('/register', async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      email,
      password,
      userType,
    });

    await user.save();

    req.session.user = {
      id: user.id,
      email: user.email,
      userType: user.userType,
    };

    res.status(201).json(req.session.user);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (!user.password) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      userType: user.userType,
    };

    res.json(req.session.user);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Server Error');
    }
    res.clearCookie('connect.sid');
    res.json({ msg: 'Logged out' });
  });
});

export default router;
