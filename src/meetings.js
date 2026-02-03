// Handles meetings management for client portal
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const meetingsFile = path.join(__dirname, '../uploads/meetings.json');

// Helper to read meetings
function readMeetings() {
  if (!fs.existsSync(meetingsFile)) return [];
  try {
    return JSON.parse(fs.readFileSync(meetingsFile, 'utf8'));
  } catch {
    return [];
  }
}
// Helper to write meetings
function writeMeetings(meetings) {
  fs.writeFileSync(meetingsFile, JSON.stringify(meetings, null, 2));
}

// List all meetings
router.get('/list', (req, res) => {
  res.json(readMeetings());
});

// Add a meeting
router.post('/add', express.json(), (req, res) => {
  const { title, attendees, when, notes } = req.body;
  if (!title || !when) return res.status(400).json({ error: 'Missing required fields' });
  const meetings = readMeetings();
  const meeting = {
    id: 'mtg_' + Math.random().toString(16).slice(2),
    title,
    attendees,
    when,
    notes
  };
  meetings.push(meeting);
  writeMeetings(meetings);
  res.json(meeting);
});

// Delete a meeting
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  let meetings = readMeetings();
  const before = meetings.length;
  meetings = meetings.filter(m => m.id !== id);
  writeMeetings(meetings);
  res.json({ deleted: before - meetings.length });
});

module.exports = router;
