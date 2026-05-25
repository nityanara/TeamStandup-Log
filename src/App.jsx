import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Users,
  Timer,
  History,
  Settings,
  PlusCircle,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  MessageSquare,
  CircleDot,
  Pin,
  MoreVertical,
  Flame,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Calendar,
  AlertCircle,
  PanelLeftClose,
  PanelLeftOpen,
  UserPlus,
  Info,
  Bold,
  Italic,
  Code,
  Link as LinkIcon,
  Smile,
  Send,
  CheckCheck,
  Hash
} from 'lucide-react';

// INITIAL DATA CONSTANTS
const INITIAL_MEETINGS = [
  {
    id: 1,
    time: "09:00",
    title: "Daily Standup",
    tag: "#engineering",
    borderClass: "border-secondary",
    leftBarBg: "bg-secondary",
    tagColor: "bg-secondary-container text-on-secondary-container",
    participants: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCLcu4vY0eRW-Yku4dSKTjLy1NdOCqnoDql2y5qQj0GSloxYm3GQt-lnQLGd1zQ45w-3lkcXPBgslROeTVGyjU3UcE-Dny8OQieyMx9uZMVwvZ2dDq-wEGiny_569JY1uPR5gJjLddHRq9QZwgfupwP-asHxqqPOPw3ia-T-pWoSXGPQDXmWK2oDYo7FS38ihFqEdYKDGpdXyTussWpWzbRgFX1LSJOkBN-213rUbh658nP18w4gnJJYMl4ByCK0zgilvHPGgBGbuhA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBX1B6HOgICLSEFkcIhG7wJ2wCE07_jf3Bm77MqASNu83_FxKJCkeZ_L-ZUhiHi1CasHO1-Fkisv22FeIgq3dpDWXa4Sz6sJ9T4IHSCsHfsiSAUfHBHbdXFqTJQYhSt_sFr7szbFbJPrFie6aYqD3tLNaI74sRhnIwwaKFU8V6vM9o7RI28LPiFqWueQf6BvA-AYf9V9wXjjLlwryekcbeiOWvvYOgGxxmOWRE1kGANCq0rpo_D1UWjVwKRxgWI_3tPYASXCVoKFfk"
    ],
    plusCount: 4,
    day: 14 // Tue 14
  },
  {
    id: 2,
    time: "10:30",
    title: "Backend Sync",
    tag: "#architecture",
    borderClass: "border-primary",
    leftBarBg: "bg-primary",
    tagColor: "bg-primary-fixed text-on-primary-fixed-variant",
    isActive: true,
    day: 14
  },
  {
    id: 3,
    time: "13:00",
    title: "Design Review",
    tag: "#product",
    borderClass: "border-tertiary-container",
    leftBarBg: "bg-tertiary-container",
    tagColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    opacityClass: "opacity-75 hover:opacity-100",
    day: 14
  },
  {
    id: 4,
    time: "15:00",
    title: "Sprint Review",
    tag: "#management",
    borderClass: "border-error",
    leftBarBg: "bg-error",
    tagColor: "bg-error-container text-on-error-container",
    isPinned: true,
    opacityClass: "opacity-75 hover:opacity-100",
    day: 14
  },
  {
    id: 5,
    time: "11:00",
    title: "Architecture Alignment",
    tag: "#architecture",
    borderClass: "border-primary",
    leftBarBg: "bg-primary",
    tagColor: "bg-primary-fixed text-on-primary-fixed-variant",
    day: 15 // Wed 15
  },
  {
    id: 6,
    time: "14:00",
    title: "Product Roadmap Sync",
    tag: "#product",
    borderClass: "border-tertiary-container",
    leftBarBg: "bg-tertiary-container",
    tagColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    day: 16 // Thu 16
  }
];

const INITIAL_TEAM = [
  {
    id: 1,
    name: "Jordan Dai",
    status: "Active",
    statusColor: "bg-secondary-fixed-dim",
    textColor: "text-secondary",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFwBIhBOPFLrM0VeTsRZ9SdvZCgRAMAstg19E6MU8iM1oThKzU39C8KYBFSEv8s5I-7RoYqJxnBmRspohGCAHF0jylUBQodtZuwb5TyLbEiTl5zWNUdRMFAJzAmLt5YFVZ28ixC-05yCjGSUdG_6AAbcuNVKi4K6wvpSPoaUjaI0syF5AYPanTHr7dyqQwSgSFHx9KkF2OYvR3qnk8BwvYsDTsU3Kml6A5wvl1RHl7E3zFQPoFgmUwdtozQX0h4LTvNx49ANLEW0cS"
  },
  {
    id: 2,
    name: "Sarah Kim",
    status: "In Focus",
    statusColor: "bg-primary-fixed-dim",
    textColor: "text-primary",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkqanHIVXtcsxd8DQASEYkghDkeROMn7C8j8q7z40vv5eK5GUWmR5uSXRePXoZK-PpVfKfENpNGFTEEqExZqfmAlmKYkFatAdVk2v1_4UwuAPxiu2lPqSS9n981yFpjuIi9uW4Msxlt7kvA5393WAkdzAYhkA20XSeDy2oEkdk2RM_a4T8TOb79vBeijCTJiFbYuQM6oaKzD4-_u7dauC2_t8dAkTM-Gbo7rPwQQuqWGdilIkHdRlbqnSwsosujauhD7joiLJOThR0"
  },
  {
    id: 3,
    name: "Ryan Lee",
    status: "Offline",
    statusColor: "bg-outline-variant",
    textColor: "text-on-surface-variant",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjqeSEtdCezz-FdCxI8DK8snPAKBt2-d0CG7Py8VjfiY_0dZAmz8LluvF4kZdHTEtWeLl7M4Goi-s-wJfUdJX1nSvmUUNaivl-0E38Sl3PJOUAudgrHAQOCM2HHeiaIBKfF8DdekMYDw0Z6z0wqK_yUD_AYH5-BBVfScknO-jtuB-MlA1gZ8uZ8EbGfhoDiIlU8XAdRXFCeCj9dG8kilGBo3oju93lZVBZU8vbsCVHDe07Ku9Qoc3J4NKZq5XHuMu-qfESJ8EvEs-d"
  },
  {
    id: 4,
    name: "Elena Moore",
    status: "Blocked",
    statusColor: "bg-tertiary-fixed-dim",
    textColor: "text-tertiary",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzJUUFPeaXaNSmBc9IouUAPguU4wUDxEUlwbuv8X6REKGi-NOo4n34CqY4CFL1SL8qFmkS06UQ4V6zWM0zMIov95scxVCGwjJRk9fvEMLSLiIJr381w0wbiDfCyEIzSVIK_HNgu8PKWdOnKUTfQgG4N3Xc44Wz-O1qYBxj0D8wCngN4_SaY0S0ETZG9slupMeKMXx44rVBsiNgtFs4S9UakSlMulMdN_5VYhj0BRnAZmYZAxqQlsHfHM0JHChHBDHAbkNgNRzCukwc"
  },
  {
    id: 5,
    name: "Tom Harris",
    status: "Active",
    statusColor: "bg-secondary-fixed-dim",
    textColor: "text-secondary",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGKbIfe43ip7ixmyfqmSTisUnJu_bOcgWVq1DMsgnuvbDP315A3ggH5yJNJulGCVIxa9wlZ6OXY61f0jkcJ0CHFRja_J641HWBiFha5QAOmCU5qXpMSsIiizaGrU51JmTp7FDLD5WhPvPyHHmIVKGacyPnXBv2Og66ID_U416FCHrSaUkOKTKX6YvCkWOLypcvyMyH0zIRu5KhEj3C6sfJy_9AkoQwXoyAlhl_puE6q0fmvsY2J9CDliRmo5EOmPvDiSURudfVO65m"
  }
];

const CALENDAR_DAYS = [
  { label: 'MON', date: 13, labelFull: 'Monday' },
  { label: 'TUE', date: 14, labelFull: 'Tuesday' },
  { label: 'WED', date: 15, labelFull: 'Wednesday' },
  { label: 'THU', date: 16, labelFull: 'Thursday' },
  { label: 'FRI', date: 17, labelFull: 'Friday' },
  { label: 'SAT', date: 18, labelFull: 'Saturday', dim: true },
  { label: 'SUN', date: 19, labelFull: 'Sunday', dim: true }
];

// CHAT CHANNEL INITIAL STATE
const INITIAL_GROUPS = [
  { id: 'engineering-core', name: 'engineering-core', type: 'channel', members: 12, desc: 'Core development and infrastructure sync' },
  { id: 'product-sync', name: 'product-sync', type: 'channel', members: 8, desc: 'Product strategy and milestone alignment' },
  { id: 'frontend-guild', name: 'frontend-guild', type: 'channel', members: 6, desc: 'Design systems, UI styling, and frontend specs' }
];

const INITIAL_DMS = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    type: 'dm',
    status: 'Active',
    statusColor: 'bg-secondary',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeRfHiaTGS3B_zviK9PXeZggDqgGPuFvb5rc6ZaK8QmXqc-PSoM34FQKTo_z_SapzUsLox07Gne5uZDhTYxMNQJCg1Toi-MGZ6yeyEXs5KsE9O-vCTwJwBfFvxw6cZaKxjM62haAAq1HTEdi3D5PcEwghceZ2ZQeUXpSjLeH27lvkMR-n4pS_0p0orn3ED4sJui8Xre4dNesigZKzAOdzAo4Kl0BWQFntyjHy0iGE-KFrGCzO5KgEVUA15XcmBzSMWiX6LIY-fXcdD'
  },
  {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    type: 'dm',
    status: 'Active',
    statusColor: 'bg-secondary',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADAVIoq1Fq_1NRA-qcEnMhyKcipio2Y8-zwxgPMbaiCS-w6bN5mxlxGifDwY7W-NIVL8HPwJIba0vEdQOi7iZTS07fSXCG-lTxIRikT0mVRVGEoxylMAGe8fmXSceYDYwwF2lgqkj5CdT7Jq9gLNPrbbwUm_olhmULriUw8r9ZWAcCi0m5eUmwToGlzADo9S8w2zjBiGj1XrbxhB_4kCz8gnLoB55Tbtx2gFDZooE62dm9wW1Tp-DOCnnq1PZ04hLBo_lpoKVRlrwS'
  },
  {
    id: 'jordan-lee',
    name: 'Jordan Lee',
    type: 'dm',
    status: 'Offline',
    statusColor: 'bg-outline-variant',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmjHnS6tVodNqzjfFKZvCqMxaCrpyV8pbzjYknK_TvCxQNwRjulsKAluVIGfjnWWzhJjN1ih1ND6-gIiQXHGgjC7xHZIeicFteu7K0wsTvpERRIdAAx9dc-8BtKfhGelSPp8Lmvi619zGbwsZv0McRSpBawAdgOot1c8L5n7-veM33J4wBy6JRqsmVT7HSfZx9uBXwslTcJLXytj5M9ikMbhy8is_N9E2deEHonfsXEcGUzJER_S0gCzjqx8IirTCYX991jVBQWz5t'
  }
];

const INITIAL_MESSAGES = {
  'engineering-core': [
    {
      id: 101,
      sender: "Sarah Chen",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDn0JpaDgAPKiBmy9NNO3QWXjcoH2Cb1ZnZhyTWpSr0hWEbq74F_b2BKrj348tbJHj99rAVCqPUbDql7bw7ThEb9qZugUgq0JUawiLidyHelRd2LE-HKjTZASOlyIDpllZPcIz56YCbluWm2oPAHLKgXQHJxtefb2VXiWLAoE3WIbHfaqfs21JddWqZSdjxqvSNa5IuAVSrikY_u2PW0nVEwZV5a58PzJdsAig61TyUFbw4LIN68XhoKcw0gnjONNlN3YmlJ25775qM",
      time: "10:24 AM",
      text: "Hey everyone! Just pushed the initial draft for the new logger architecture. It's using the new pipeline pattern we discussed. Can someone take a quick look?",
      reactions: { '🚀': 4, '👀': 2 }
    },
    {
      id: 102,
      sender: "Alex Rivera",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuADAVIoq1Fq_1NRA-qcEnMhyKcipio2Y8-zwxgPMbaiCS-w6bN5mxlxGifDwY7W-NIVL8HPwJIba0vEdQOi7iZTS07fSXCG-lTxIRikT0mVRVGEoxylMAGe8fmXSceYDYwwF2lgqkj5CdT7Jq9gLNPrbbwUm_olhmULriUw8r9ZWAcCi0m5eUmwToGlzADo9S8w2zjBiGj1XrbxhB_4kCz8gnLoB55Tbtx2gFDZooE62dm9wW1Tp-DOCnnq1PZ04hLBo_lpoKVRlrwS",
      time: "10:31 AM",
      text: "On it, Sarah. Looking at the LogManager.ts now. The abstraction looks solid.",
      read: true
    },
    {
      id: 103,
      sender: "Jordan Lee",
      avatar: "JL",
      time: "11:15 AM",
      text: "Quick question: did we decide on the retention policy for the debug logs? I recall 30 days but the config shows 7."
    }
  ],
  'product-sync': [
    {
      id: 201,
      sender: "Alex Rivera",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuADAVIoq1Fq_1NRA-qcEnMhyKcipio2Y8-zwxgPMbaiCS-w6bN5mxlxGifDwY7W-NIVL8HPwJIba0vEdQOi7iZTS07fSXCG-lTxIRikT0mVRVGEoxylMAGe8fmXSceYDYwwF2lgqkj5CdT7Jq9gLNPrbbwUm_olhmULriUw8r9ZWAcCi0m5eUmwToGlzADo9S8w2zjBiGj1XrbxhB_4kCz8gnLoB55Tbtx2gFDZooE62dm9wW1Tp-DOCnnq1PZ04hLBo_lpoKVRlrwS",
      time: "Yesterday",
      text: "Draft specs for Q3 milestones have been uploaded to Drive. Let's align during next Tuesday sync."
    }
  ],
  'frontend-guild': [
    {
      id: 301,
      sender: "Jordan Lee",
      avatar: "JL",
      time: "2 days ago",
      text: "Has anyone integrated Tailwind CSS v4 in local environments yet? Compilation speeds look promising."
    }
  ],
  'sarah-chen': [
    {
      id: 401,
      sender: "Sarah Chen",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeRfHiaTGS3B_zviK9PXeZggDqgGPuFvb5rc6ZaK8QmXqc-PSoM34FQKTo_z_SapzUsLox07Gne5uZDhTYxMNQJCg1Toi-MGZ6yeyEXs5KsE9O-vCTwJwBfFvxw6cZaKxjM62haAAq1HTEdi3D5PcEwghceZ2ZQeUXpSjLeH27lvkMR-n4pS_0p0orn3ED4sJui8Xre4dNesigZKzAOdzAo4Kl0BWQFntyjHy0iGE-KFrGCzO5KgEVUA15XcmBzSMWiX6LIY-fXcdD",
      time: "10:20 AM",
      text: "Hi Alex! Let me know if you can check the API logger draft today."
    }
  ],
  'alex-rivera': [
    {
      id: 501,
      sender: "Alex Rivera",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuADAVIoq1Fq_1NRA-qcEnMhyKcipio2Y8-zwxgPMbaiCS-w6bN5mxlxGifDwY7W-NIVL8HPwJIba0vEdQOi7iZTS07fSXCG-lTxIRikT0mVRVGEoxylMAGe8fmXSceYDYwwF2lgqkj5CdT7Jq9gLNPrbbwUm_olhmULriUw8r9ZWAcCi0m5eUmwToGlzADo9S8w2zjBiGj1XrbxhB_4kCz8gnLoB55Tbtx2gFDZooE62dm9wW1Tp-DOCnnq1PZ04hLBo_lpoKVRlrwS",
      time: "Yesterday",
      text: "Hey, the core refactoring branch is clean. We can merge whenever you have a slot."
    }
  ],
  'jordan-lee': []
};

function App() {
  // STATE MANAGEMENT
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedDate, setSelectedDate] = useState(14);
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Collapse Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Modals & Panels
  const [isNewStandupOpen, setIsNewStandupOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTeamMemberId, setActiveTeamMemberId] = useState(null); // for editing team presence status
  
  // TEAMS CHAT STATE
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [dms, setDms] = useState(INITIAL_DMS);
  const [activeChatId, setActiveChatId] = useState('engineering-core');
  const [chatMessagesLog, setChatMessagesLog] = useState(INITIAL_MESSAGES);
  const [chatInputText, setChatInputText] = useState('');

  // New Standup Form State
  const [formData, setFormData] = useState({
    title: '',
    time: '10:00',
    tag: '#engineering',
    type: 'general',
    status: ''
  });

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Sarah Kim tagged you in #architecture sync", time: "5m ago", read: false },
    { id: 2, text: "Daily Standup scheduled for 09:00", time: "1h ago", read: true },
    { id: 3, text: "Sprint 24 migration is 85% completed", time: "2h ago", read: true }
  ]);

  // Global top-bar Chat drawer messages
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Sarah Kim", text: "Hey Alex, are we all set for the backend sync at 10:30?", time: "10:22 AM" },
    { id: 2, sender: "You", text: "Yes! Just reviewing the migration tasks checklist now.", time: "10:24 AM" }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // FILTERED MEETINGS
  const filteredMeetings = useMemo(() => {
    return meetings.filter(m => {
      const matchesDate = m.day === selectedDate;
      const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            m.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDate && matchesSearch;
    });
  }, [meetings, selectedDate, searchQuery]);

  // DATE HELPERS
  const handleDaySelect = (day) => {
    setSelectedDate(day);
  };

  const handleNextDay = () => {
    const currentIndex = CALENDAR_DAYS.findIndex(d => d.date === selectedDate);
    if (currentIndex < CALENDAR_DAYS.length - 1) {
      setSelectedDate(CALENDAR_DAYS[currentIndex + 1].date);
    }
  };

  const handlePrevDay = () => {
    const currentIndex = CALENDAR_DAYS.findIndex(d => d.date === selectedDate);
    if (currentIndex > 0) {
      setSelectedDate(CALENDAR_DAYS[currentIndex - 1].date);
    }
  };

  const handleCreateStandup = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    // Map tag configuration
    let borderClass = 'border-primary';
    let leftBarBg = 'bg-primary';
    let tagColor = 'bg-primary-fixed text-on-primary-fixed-variant';

    if (formData.tag === '#engineering') {
      borderClass = 'border-secondary';
      leftBarBg = 'bg-secondary';
      tagColor = 'bg-secondary-container text-on-secondary-container';
    } else if (formData.tag === '#product') {
      borderClass = 'border-tertiary-container';
      leftBarBg = 'bg-tertiary-container';
      tagColor = 'bg-tertiary-fixed text-on-tertiary-fixed-variant';
    } else if (formData.tag === '#management') {
      borderClass = 'border-error';
      leftBarBg = 'bg-error';
      tagColor = 'bg-error-container text-on-error-container';
    }

    const newMeeting = {
      id: Date.now(),
      time: formData.time,
      title: formData.title,
      tag: formData.tag,
      borderClass,
      leftBarBg,
      tagColor,
      isActive: false,
      isPinned: false,
      day: selectedDate,
      participants: []
    };

    setMeetings([...meetings, newMeeting]);
    setIsNewStandupOpen(false);
    // Reset form
    setFormData({
      title: '',
      time: '10:00',
      tag: '#engineering',
      type: 'general',
      status: ''
    });
  };

  const toggleStatus = (memberId, newStatus) => {
    const statusMap = {
      'Active': { color: 'bg-secondary-fixed-dim', text: 'text-secondary' },
      'In Focus': { color: 'bg-primary-fixed-dim', text: 'text-primary' },
      'Offline': { color: 'bg-outline-variant', text: 'text-on-surface-variant' },
      'Blocked': { color: 'bg-tertiary-fixed-dim', text: 'text-tertiary' }
    };

    setTeamMembers(teamMembers.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          status: newStatus,
          statusColor: statusMap[newStatus].color,
          textColor: statusMap[newStatus].text
        };
      }
      return m;
    }));
    setActiveTeamMemberId(null);
  };

  // Top Drawer Chat Message Sender
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setChatMessages([
      ...chatMessages,
      {
        id: Date.now(),
        sender: "You",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setNewMessage('');
  };

  // TEAMS SECTION CHAT HANDLERS
  const handleSendTeamMessage = (e) => {
    if (e) e.preventDefault();
    if (!chatInputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "Alex Chen (You)",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4Wixz0l9D01phIpUXz8Yx0XmkkSUtsgojqIvqnaLX5a-kOkJewNerNxHrfiAjwm7dvEd8Rvz5ighO-TLU4QFCrKfZ3SDFB8e-xs97uZKHONO2TVeeOaxPm0GLON2gMANkWU1nsO8cMay45bm_799Ls1711heOeUIo-yUVnnLAxYZIw-6Pza3juJb8YN9CF4WDgJzTEOpbXPit9qFwrZ2Z_KIeM8JnKq1-U7ikaKitDYVUCMypiG7WbBrwP-YqNhOtmnbVdXUKDNUM",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: chatInputText
    };

    setChatMessagesLog({
      ...chatMessagesLog,
      [activeChatId]: [...(chatMessagesLog[activeChatId] || []), newMsg]
    });
    setChatInputText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendTeamMessage();
    }
  };

  const handleAddReaction = (messageId, emoji) => {
    setChatMessagesLog({
      ...chatMessagesLog,
      [activeChatId]: chatMessagesLog[activeChatId].map(msg => {
        if (msg.id === messageId) {
          const reactions = { ...(msg.reactions || {}) };
          reactions[emoji] = (reactions[emoji] || 0) + 1;
          return { ...msg, reactions };
        }
        return msg;
      })
    });
  };

  const handleCreateGroup = () => {
    const name = prompt("Enter new Group / Channel Name (without spaces):");
    if (!name) return;
    const cleanName = name.trim().toLowerCase().replace(/\s+/g, '-');
    if (!cleanName) return;

    const desc = prompt("Enter channel description:", "General project collaboration and milestones");
    const newChan = {
      id: cleanName,
      name: cleanName,
      type: 'channel',
      members: 1,
      desc: desc || "General project workspace"
    };

    setGroups([...groups, newChan]);
    setChatMessagesLog({
      ...chatMessagesLog,
      [cleanName]: []
    });
    setActiveChatId(cleanName);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const activeChatInfo = useMemo(() => {
    const selectedGroup = groups.find(g => g.id === activeChatId);
    if (selectedGroup) return selectedGroup;
    const selectedDm = dms.find(d => d.id === activeChatId);
    if (selectedDm) return { ...selectedDm, desc: selectedDm.status === 'Active' ? 'Active now' : 'Offline' };
    return { name: 'Chat Workspace', members: 0, desc: '' };
  }, [groups, dms, activeChatId]);

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans antialiased overflow-x-hidden">
      
      {/* 1. COLLAPSIBLE LEFT NAVIGATION SIDEBAR */}
      <aside 
        className={`flex flex-col h-full py-6 px-4 bg-surface-container-low dark:bg-inverse-surface fixed left-0 top-0 border-r border-outline-variant z-30 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64 opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-full pointer-events-none'
        }`}
      >
        {/* Logo & Close toggle */}
        <div className="mb-10 px-3 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-primary">AsyncSync</h1>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5">Engineering Workspace</p>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 text-on-surface-variant hover:text-primary rounded-lg hover:bg-surface-container-highest/60 transition-colors cursor-pointer"
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-grow space-y-1">
          {[
            { name: 'Dashboard', icon: LayoutDashboard },
            { name: 'Teams', icon: Users },
            { name: 'Standups', icon: Timer },
            { name: 'History', icon: History },
            { name: 'Settings', icon: Settings }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'text-primary font-bold border-r-2 border-primary bg-surface-container-highest'
                    : 'text-on-surface-variant hover:bg-surface-container-highest/60 hover:text-on-surface'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions Section */}
        <div className="mt-auto space-y-4 pt-4 border-t border-outline-variant/60">
          <div>
            <button
              onClick={() => setIsNewStandupOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-on-primary rounded-xl font-bold hover:bg-primary-container transition-all shadow-sm active:scale-95 duration-150 text-sm cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Standup</span>
            </button>
          </div>

          <div className="space-y-0.5">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert("Help & Documentation coming soon!"); }}
              className="flex items-center gap-3 px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-colors"
            >
              <HelpCircle className="w-4.5 h-4.5" />
              <span>Help</span>
            </a>
            
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert("Logout simulated successfully."); }}
              className="flex items-center gap-3 px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-colors"
            >
              <LogOut className="w-4.5 h-4.5" />
              <span>Logout</span>
            </a>
          </div>
        </div>
      </aside>

      {/* 2. TOP APP BAR (HEADER SEARCH) - Rendered ONLY if NOT in full-bleed Teams tab */}
      {activeTab !== 'Teams' && (
        <header 
          className={`flex justify-between items-center px-8 h-16 bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-outline-variant transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-64 w-[calc(100%-16rem)]' : 'ml-0 w-full'
          }`}
        >
          <div className="flex items-center flex-grow max-w-xl gap-3">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 text-on-surface-variant hover:text-primary rounded-lg hover:bg-surface-container-highest transition-colors flex-shrink-0 cursor-pointer"
                title="Expand Sidebar"
              >
                <PanelLeftOpen className="w-5 h-5" />
              </button>
            )}

            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4.5 h-4.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder-on-surface-variant/70 animate-in fade-in"
                placeholder="Search workspace..."
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsChatOpen(false);
                }}
                className={`relative p-2 hover:text-primary transition-all active:scale-95 rounded-lg hover:bg-surface-container-highest/40 cursor-pointer ${
                  isNotificationOpen ? 'text-primary bg-surface-container-highest/60' : 'text-on-surface-variant'
                }`}
              >
                <Bell className="w-5 h-5" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-background"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-outline-variant z-50 p-4 transform origin-top-right transition-all animate-in fade-in slide-in-from-top-2 duration-100">
                  <div className="flex justify-between items-center border-b border-outline-variant/60 pb-2 mb-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Notifications</h5>
                    <button 
                      onClick={markAllNotificationsAsRead}
                      className="text-[10px] text-primary font-bold hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-hide">
                    {notifications.map(n => (
                      <div 
                        key={n.id} 
                        className={`p-2 rounded-lg text-xs transition-colors ${
                          n.read ? 'text-on-surface-variant hover:bg-surface-container-low/40' : 'bg-surface-container-high/40 text-on-surface font-medium border-l-2 border-primary'
                        }`}
                      >
                        <p>{n.text}</p>
                        <span className="text-[10px] text-outline mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Messages Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsChatOpen(!isChatOpen);
                  setIsNotificationOpen(false);
                }}
                className={`p-2 hover:text-primary transition-all active:scale-95 rounded-lg hover:bg-surface-container-highest/40 cursor-pointer ${
                  isChatOpen ? 'text-primary bg-surface-container-highest/60' : 'text-on-surface-variant'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              {/* Chat Drawer Dropdown */}
              {isChatOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-outline-variant z-50 flex flex-col h-[380px] transform origin-top-right transition-all animate-in fade-in slide-in-from-top-2 duration-100">
                  <div className="p-3 border-b border-outline-variant/60 flex items-center justify-between bg-surface-container-low rounded-t-xl">
                    <div className="flex items-center gap-2">
                      <img 
                        className="w-6 h-6 rounded-full border border-outline-variant"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkqanHIVXtcsxd8DQASEYkghDkeROMn7C8j8q7z40vv5eK5GUWmR5uSXRePXoZK-PpVfKfENpNGFTEEqExZqfmAlmKYkFatAdVk2v1_4UwuAPxiu2lPqSS9n981yFpjuIi9uW4Msxlt7kvA5393WAkdzAYhkA20XSeDy2oEkdk2RM_a4T8TOb79vBeijCTJiFbYuQM6oaKzD4-_u7dauC2_t8dAkTM-Gbo7rPwQQuqWGdilIkHdRlbqnSwsosujauhD7joiLJOThR0"
                        alt="" 
                      />
                      <div>
                        <h5 className="text-xs font-bold leading-none">Sarah Kim</h5>
                        <span className="text-[9px] text-primary font-mono font-medium">Active in Focus</span>
                      </div>
                    </div>
                    <button onClick={() => setIsChatOpen(false)} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Message Log */}
                  <div className="flex-grow p-3 overflow-y-auto space-y-2 bg-slate-50/50">
                    {chatMessages.map(msg => (
                      <div 
                        key={msg.id} 
                        className={`max-w-[85%] rounded-lg p-2 text-xs ${
                          msg.sender === "You" 
                            ? "bg-primary text-on-primary ml-auto rounded-tr-none" 
                            : "bg-surface-container-highest text-on-surface mr-auto rounded-tl-none"
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                        <span className={`text-[8px] mt-1 block text-right ${
                          msg.sender === "You" ? "text-primary-fixed/80" : "text-outline"
                        }`}>{msg.time}</span>
                      </div>
                    ))}
                  </div>

                  {/* Message input */}
                  <form onSubmit={handleSendMessage} className="p-2 border-t border-outline-variant flex gap-1">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-grow bg-surface-container-low border border-outline-variant rounded-lg px-3 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button 
                      type="submit" 
                      className="bg-primary text-on-primary rounded-lg px-3 py-1 text-xs font-bold hover:bg-primary-container transition-colors active:scale-95 cursor-pointer"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}
            </div>

            <img
              alt="Engineer Avatar"
              className="w-8 h-8 rounded-full border border-outline-variant cursor-pointer transition-transform hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvUrpZpd8G86fI17I9S4MPtL3eqqXLSreUrEHCtGRwkmffxYl96qO4sjrK3Vo6Q0lHM9VHcrOhOnhIiElbPuKEP3LpSMeSfVshgAogDNUKg2Z75aTFsKF3qj6pdST1kwJTCGWsyw7I5cGvSFIeRRCyk4Fpp4jQRK63QJ2RhMtUZBk8U7AtqLE9XJ-rnDTc2tuS1Smzl5K1YgeJHZGC3FtGkhS03RBFJVjYXc_l7TF4Dm76vB1Gj8is8YAtra8pOje3vVdJP63nOXx4"
              onClick={() => alert("Alex Chen profile workspace configuration.")}
            />
          </div>
        </header>
      )}

      {/* 3. MAIN DASHBOARD CONTENT AREA */}
      {activeTab === 'Teams' ? (
        
        /* FULL-BLEED DOUBLE-PANE INTERACTIVE TEAMS CHAT VIEW */
        <main 
          className={`flex h-screen overflow-hidden transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {/* Middle Pane: Teams & Groups List */}
          <section className="w-[320px] bg-surface-container-low/50 border-r border-outline-variant flex flex-col h-full flex-shrink-0">
            <div className="h-16 flex items-center px-6 justify-between flex-shrink-0 border-b border-outline-variant/30">
              
              <div className="flex items-center gap-2">
                {!isSidebarOpen && (
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-1 text-on-surface-variant hover:text-primary rounded-lg hover:bg-surface-container-highest transition-colors cursor-pointer"
                    title="Expand Sidebar"
                  >
                    <PanelLeftOpen className="w-4.5 h-4.5" />
                  </button>
                )}
                <h2 className="text-lg font-bold text-on-surface font-headline-md leading-none">Teams</h2>
              </div>
              
              <button 
                onClick={handleCreateGroup}
                className="p-1 hover:bg-surface-container rounded-full text-primary transition-all cursor-pointer"
                title="Add Group"
              >
                <UserPlus className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-hide">
              {/* Joined Groups Section */}
              <div>
                <div className="px-3 mb-2 flex items-center justify-between text-on-surface-variant/60">
                  <span className="text-[10px] font-sans uppercase tracking-widest font-semibold">Joined Groups</span>
                </div>
                <ul className="space-y-0.5">
                  {groups.map((group) => {
                    const isActive = activeChatId === group.id;
                    return (
                      <li key={group.id}>
                        <button
                          onClick={() => setActiveChatId(group.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-left text-sm cursor-pointer ${
                            isActive
                              ? 'bg-primary-container text-on-primary-container font-semibold'
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <Hash className={`w-4 h-4 ${isActive ? 'text-on-primary-container/70' : 'text-outline-variant'}`} />
                          <span className="truncate">{group.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Direct Messages Section */}
              <div>
                <div className="px-3 mb-2 text-on-surface-variant/60">
                  <span className="text-[10px] font-sans uppercase tracking-widest font-semibold">Direct Messages</span>
                </div>
                <ul className="space-y-0.5">
                  {dms.map((dm) => {
                    const isActive = activeChatId === dm.id;
                    return (
                      <li key={dm.id}>
                        <button
                          onClick={() => setActiveChatId(dm.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-left text-sm cursor-pointer ${
                            isActive
                              ? 'bg-primary-container text-on-primary-container font-semibold'
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <div className="relative flex-shrink-0">
                            <img alt={dm.name} className="w-6 h-6 rounded-full border border-slate-100" src={dm.avatar} />
                            <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white ${
                              dm.status === 'Active' ? 'bg-secondary' : 'bg-outline-variant'
                            }`}></div>
                          </div>
                          <span className="truncate">{dm.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="p-4 flex-shrink-0 border-t border-outline-variant/30 bg-surface-container-low/20">
              <button 
                onClick={handleCreateGroup}
                className="w-full border border-outline-variant text-on-surface-variant font-bold text-xs py-2 rounded-lg hover:bg-surface-container hover:text-on-surface transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-98"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Group</span>
              </button>
            </div>
          </section>

          {/* Right Main Chat Pane */}
          <section className="flex-1 flex flex-col bg-white overflow-hidden h-full">
            {/* Chat Header */}
            <header className="h-16 flex items-center justify-between px-6 border-b border-outline-variant/30 bg-white/80 backdrop-blur-sm flex-shrink-0 sticky top-0 z-10">
              <div className="flex items-center gap-2 min-w-0">
                {activeChatInfo.type === 'channel' ? (
                  <Hash className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <img alt="" className="w-6 h-6 rounded-full" src={activeChatInfo.avatar} />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full border border-white ${
                      activeChatInfo.status === 'Active' ? 'bg-secondary' : 'bg-outline-variant'
                    }`}></div>
                  </div>
                )}
                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-on-surface truncate leading-none">{activeChatInfo.name}</h2>
                  <p className="text-[10px] text-on-surface-variant/60 mt-1 truncate">
                    {activeChatInfo.type === 'channel' 
                      ? `${activeChatInfo.members} members • ${activeChatInfo.desc}` 
                      : activeChatInfo.desc}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => alert("Searching this conversation history...")}
                  className="p-1.5 hover:bg-surface-container rounded-full text-on-surface-variant transition-all cursor-pointer"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={() => alert(`Details:\nName: #${activeChatInfo.name}\n${activeChatInfo.desc}`)}
                  className="p-1.5 hover:bg-surface-container rounded-full text-on-surface-variant transition-all cursor-pointer"
                >
                  <Info className="w-4.5 h-4.5" />
                </button>
              </div>
            </header>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-slate-50/20">
              {/* Date Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-outline-variant opacity-25"></div>
                <span className="text-[10px] text-on-surface-variant/50 font-semibold">Today, October 24</span>
                <div className="flex-1 h-px bg-outline-variant opacity-25"></div>
              </div>

              {/* Messages list */}
              {(!chatMessagesLog[activeChatId] || chatMessagesLog[activeChatId].length === 0) ? (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                  <MessageSquare className="w-12 h-12 text-outline-variant/60 mb-2.5" />
                  <h4 className="text-sm font-bold text-on-surface">No messages here yet</h4>
                  <p className="text-xs text-on-surface-variant/70 mt-1">Start the conversation by sending a message below!</p>
                </div>
              ) : (
                chatMessagesLog[activeChatId].map((msg) => (
                  <div key={msg.id} className="flex gap-4 group items-start animate-in fade-in-50 duration-150">
                    {/* User Profile Avatar */}
                    {typeof msg.avatar === 'string' && msg.avatar.startsWith('http') ? (
                      <img 
                        className="w-9 h-9 rounded-xl bg-secondary-container object-cover border border-slate-100 hover:scale-105 transition-transform" 
                        src={msg.avatar} 
                        alt="" 
                      />
                    ) : (
                      <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary-container text-on-primary-container font-bold text-xs border border-transparent select-none">
                        {msg.avatar || msg.sender.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-on-surface">{msg.sender}</span>
                        <span className="text-[9px] text-on-surface-variant/40">{msg.time}</span>
                      </div>
                      
                      <div className="text-xs text-on-surface leading-relaxed max-w-3xl font-body-lg">
                        {msg.text.includes('LogManager.ts') ? (
                          <>
                            On it, Sarah. Looking at the <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-primary font-mono text-[11px] font-normal border border-outline-variant/30">LogManager.ts</code> now. The abstraction looks solid.
                          </>
                        ) : (
                          msg.text
                        )}
                      </div>

                      {/* Emoji Reactions panel */}
                      <div className="flex gap-1.5 pt-1.5 items-center flex-wrap">
                        {msg.reactions && Object.entries(msg.reactions).map(([emoji, count]) => (
                          <button
                            key={emoji}
                            onClick={() => handleAddReaction(msg.id, emoji)}
                            className="flex items-center gap-1 px-2 py-0.5 bg-secondary-container/30 border border-secondary-container text-on-secondary-container rounded-full text-[10px] font-semibold hover:bg-secondary-container/50 transition-all cursor-pointer active:scale-95"
                          >
                            <span>{emoji}</span> 
                            <span>{count}</span>
                          </button>
                        ))}

                        {/* Quick Reaction Adder trigger */}
                        <button
                          onClick={() => handleAddReaction(msg.id, '🚀')}
                          className="opacity-0 group-hover:opacity-100 flex items-center justify-center w-5 h-5 rounded-full border border-outline-variant/40 hover:bg-slate-100 text-on-surface-variant transition-all cursor-pointer"
                          title="React 🚀"
                        >
                          <span className="text-[10px]">🚀</span>
                        </button>
                        <button
                          onClick={() => handleAddReaction(msg.id, '👀')}
                          className="opacity-0 group-hover:opacity-100 flex items-center justify-center w-5 h-5 rounded-full border border-outline-variant/40 hover:bg-slate-100 text-on-surface-variant transition-all cursor-pointer"
                          title="React 👀"
                        >
                          <span className="text-[10px]">👀</span>
                        </button>
                      </div>

                      {/* Read receipts status */}
                      {msg.read && (
                        <div className="flex items-center gap-1 text-[9px] text-primary mt-1 select-none">
                          <CheckCheck className="w-3.5 h-3.5 text-primary" />
                          <span>Read</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input Box */}
            <div className="p-4 bg-white border-t border-outline-variant/30 flex-shrink-0">
              <div className="bg-surface-container-low border border-outline-variant/50 rounded-xl focus-within:ring-2 focus-within:ring-primary/10 focus-within:border-primary/40 transition-all p-1">
                
                {/* Text Formatting Bar */}
                <div className="flex items-center gap-1 px-1 border-b border-outline-variant/10 pb-1 mb-1">
                  <button 
                    onClick={() => alert("Bold text styling formatting (Simulation)")}
                    className="p-1 text-on-surface-variant/60 hover:text-primary rounded hover:bg-slate-100 transition-all cursor-pointer"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => alert("Italic text styling formatting (Simulation)")}
                    className="p-1 text-on-surface-variant/60 hover:text-primary rounded hover:bg-slate-100 transition-all cursor-pointer"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => alert("Insert code block formatting (Simulation)")}
                    className="p-1 text-on-surface-variant/60 hover:text-primary rounded hover:bg-slate-100 transition-all cursor-pointer"
                    title="Insert Code"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                  
                  <div className="w-px h-3 bg-outline-variant/30 mx-1"></div>
                  
                  <button 
                    onClick={() => alert("Insert link formatting (Simulation)")}
                    className="p-1 text-on-surface-variant/60 hover:text-primary rounded hover:bg-slate-100 transition-all cursor-pointer"
                    title="Link"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-end gap-3 px-2 pb-1.5 pt-0.5">
                  <button 
                    onClick={() => alert("Upload file/image attachment trigger")}
                    className="p-1.5 text-on-surface-variant/60 hover:bg-surface-container rounded-full transition-all cursor-pointer"
                    title="Add file"
                  >
                    <PlusCircle className="w-4.5 h-4.5" />
                  </button>
                  
                  <textarea
                    value={chatInputText}
                    onChange={(e) => setChatInputText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={`Message ${activeChatInfo.type === 'channel' ? '#' : ''}${activeChatInfo.name}`}
                    rows={1}
                    className="flex-grow bg-transparent border-none focus:ring-0 text-xs py-1.5 resize-none placeholder:text-on-surface-variant/40 outline-none max-h-24 scrollbar-hide"
                  />
                  
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button 
                      type="button"
                      onClick={() => setChatInputText(prev => prev + ' 🚀')}
                      className="p-1.5 text-on-surface-variant/60 hover:bg-surface-container rounded-full transition-all cursor-pointer"
                      title="Add emoji"
                    >
                      <Smile className="w-4.5 h-4.5" />
                    </button>
                    <button 
                      onClick={() => handleSendTeamMessage()}
                      disabled={!chatInputText.trim()}
                      className="p-1.5 bg-primary text-on-primary rounded-lg hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:scale-100 disabled:pointer-events-none transition-all cursor-pointer"
                      title="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Message Input Footer Status */}
              <div className="flex justify-between items-center px-1 mt-1.5 select-none">
                <span className="text-[9px] text-on-surface-variant/40">Press ⏎ to send, ⇧⏎ for new line</span>
                
                {activeChatId === 'engineering-core' && (
                  <div className="flex items-center gap-1 text-secondary text-[10px] font-medium">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></div>
                    <span>Alex Rivera is typing...</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      ) : (
        
        /* STANDARD VIEW FOR DASHBOARD WORKSPACE */
        <>
          <main 
            className={`p-8 grid grid-cols-12 gap-6 items-start transition-all duration-300 ease-in-out ${
              isSidebarOpen ? 'ml-64' : 'ml-0'
            }`}
          >
            {activeTab !== 'Dashboard' ? (
              // Tab views placeholders
              <section className="col-span-12 bg-white rounded-2xl border border-outline-variant p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Calendar className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-primary mb-2">{activeTab} Section</h2>
                <p className="text-sm text-on-surface-variant max-w-md leading-relaxed">
                  This panel is a placeholder for the "{activeTab}" view. The core layout features, schedule list, streak matrices, and reactive standup controllers are ready and operating on the main Dashboard view.
                </p>
                <button
                  onClick={() => setActiveTab('Dashboard')}
                  className="mt-6 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-bold hover:bg-primary-container transition-all active:scale-95 cursor-pointer"
                >
                  Back to Dashboard Workspace
                </button>
              </section>
            ) : (
              <>
                {/* CENTRAL WORKSPACE (Schedule & Planner) */}
                <section className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                  
                  {/* Header Title section */}
                  <div className="flex justify-between items-end pb-2">
                    <div>
                      <h2 className="text-2xl font-bold text-primary tracking-tight">Weekly Planner &amp; Schedule</h2>
                      <p className="text-xs font-mono text-on-surface-variant uppercase tracking-wider mt-1">November 13 — 19, 2023</p>
                    </div>
                    
                    {/* Date Controls */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedDate(14)}
                        className="px-3.5 py-1.5 border border-outline-variant rounded-lg text-xs font-mono font-medium hover:bg-surface-container transition-colors active:scale-95 duration-100 cursor-pointer"
                      >
                        Today
                      </button>
                      <div className="flex border border-outline-variant rounded-lg overflow-hidden">
                        <button
                          onClick={handlePrevDay}
                          disabled={selectedDate === 13}
                          className="px-2.5 py-1.5 hover:bg-surface-container transition-colors disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleNextDay}
                          disabled={selectedDate === 19}
                          className="px-2.5 py-1.5 border-l border-outline-variant hover:bg-surface-container transition-colors disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* CALENDAR WEEKDAY ROW */}
                  <div className="grid grid-cols-7 gap-2 border-b border-outline-variant pb-5">
                    {CALENDAR_DAYS.map((day) => {
                      const isActive = selectedDate === day.date;
                      return (
                        <button
                          key={day.date}
                          onClick={() => handleDaySelect(day.date)}
                          className={`flex flex-col items-center py-3 rounded-xl transition-all duration-150 relative cursor-pointer ${
                            isActive
                              ? 'bg-primary text-on-primary shadow-md ring-2 ring-primary/10 scale-[1.03]'
                              : 'hover:bg-surface-container-low/60 text-on-surface'
                          } ${day.dim && !isActive ? 'opacity-40' : ''}`}
                        >
                          <span className={`text-[10px] font-mono mb-1.5 ${isActive ? 'text-on-primary/80 font-bold' : 'text-on-surface-variant'}`}>
                            {day.label}
                          </span>
                          <span className="text-xl font-bold tracking-tight">{day.date}</span>
                          {isActive && (
                            <span className="absolute bottom-1 w-1.5 h-1.5 bg-white rounded-full"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* SCHEDULE TIMELINE LIST */}
                  <div className="flex flex-col gap-4 mt-2">
                    {filteredMeetings.length === 0 ? (
                      <div className="py-12 px-4 border border-dashed border-outline-variant rounded-2xl text-center flex flex-col items-center bg-white">
                        <AlertCircle className="w-10 h-10 text-outline-variant mb-2" />
                        <h5 className="text-sm font-bold text-on-surface">No meetings scheduled</h5>
                        <p className="text-xs text-on-surface-variant mt-1 max-w-xs">
                          There are no syncs or standups scheduled for {CALENDAR_DAYS.find(d => d.date === selectedDate)?.labelFull} 1{selectedDate}.
                        </p>
                        <button
                          onClick={() => setIsNewStandupOpen(true)}
                          className="mt-4 flex items-center gap-1.5 px-3 py-1.5 bg-primary text-on-primary text-xs font-bold rounded-lg hover:bg-primary-container transition-colors cursor-pointer"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Create a Sync Card</span>
                        </button>
                      </div>
                    ) : (
                      filteredMeetings.map((meeting) => (
                        <div key={meeting.id} className="grid grid-cols-[80px_1fr] gap-4 group animate-in fade-in-50">
                          
                          {/* Time Marker */}
                          <div className="text-right py-3.5">
                            <span className="text-xs font-mono font-medium text-outline">{meeting.time}</span>
                          </div>

                          {/* Card Content */}
                          <div className="relative pl-6 border-l-2 border-primary-fixed-dim/60">
                            <div className={`bg-white p-4 rounded-xl border border-outline-variant flex justify-between items-center group-hover:shadow-[0_4px_16px_rgba(74,85,102,0.06)] transition-shadow duration-200 ${meeting.opacityClass || ''}`}>
                              
                              <div className="flex gap-4 items-center min-w-0">
                                {/* Accent Vertical Bar */}
                                <div className={`w-1 h-9 ${meeting.leftBarBg} rounded-full flex-shrink-0`}></div>
                                
                                <div className="min-w-0">
                                  <h4 className="text-sm font-bold text-on-surface truncate pr-2">{meeting.title}</h4>
                                  <div className="flex gap-1.5 mt-1.5">
                                    <span className={`px-2 py-0.5 ${meeting.tagColor} text-[10px] font-mono rounded font-medium border border-transparent`}>
                                      {meeting.tag}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 flex-shrink-0">
                                
                                {meeting.isActive && (
                                  <div className="flex items-center gap-1.5 bg-primary/5 px-2 py-1 rounded-md border border-primary/10">
                                    <CircleDot className="w-3.5 h-3.5 text-primary animate-pulse" />
                                    <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">Active</span>
                                  </div>
                                )}

                                {meeting.isPinned && (
                                  <Pin className="w-4 h-4 text-tertiary-fixed-dim fill-current" />
                                )}

                                {meeting.participants && meeting.participants.length > 0 && (
                                  <div className="flex -space-x-2">
                                    {meeting.participants.map((avatar, idx) => (
                                      <img
                                        key={idx}
                                        alt={`User avatar ${idx + 1}`}
                                        className="w-6 h-6 rounded-full border-2 border-white bg-surface-container-highest"
                                        src={avatar}
                                      />
                                    ))}
                                    {meeting.plusCount && (
                                      <div className="w-6 h-6 rounded-full bg-surface-container-highest border-2 border-white flex items-center justify-center text-[9px] font-bold text-on-surface-variant font-mono">
                                        +{meeting.plusCount}
                                      </div>
                                    )}
                                  </div>
                                )}

                                <button
                                  onClick={() => {
                                    if (confirm(`Remove "${meeting.title}" schedule card?`)) {
                                      setMeetings(meetings.filter(m => m.id !== meeting.id));
                                    }
                                  }}
                                  className="opacity-0 group-hover:opacity-100 p-1 text-on-surface-variant hover:text-error rounded-md hover:bg-slate-100 transition-all duration-150 cursor-pointer"
                                  title="Delete standup sync"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>

                            </div>
                          </div>

                        </div>
                      ))
                    )}
                  </div>

                </section>

                {/* RIGHT UTILITY SIDEBAR (Metrics & Widgets) */}
                <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6 sticky top-20">
                  
                  {/* CARD 1: TEAM PRESENCE */}
                  <div className="p-5 bg-white rounded-xl shadow-[0_4px_20px_rgba(74,85,102,0.02)] border border-outline-variant">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-on-surface-variant">Team Presence</h4>
                      <button className="text-outline hover:text-on-surface p-1 rounded-md transition-colors cursor-pointer">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3.5">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="relative flex items-center justify-between group">
                          
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                className={`w-8 h-8 rounded-full border border-outline-variant ${member.status === 'Offline' ? 'grayscale opacity-75' : ''}`}
                                src={member.avatar}
                                alt={member.name}
                              />
                              <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${member.statusColor}`}></div>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <p className="text-xs font-semibold text-on-surface leading-tight">{member.name}</p>
                              <p className={`text-[10px] font-mono ${member.textColor} font-medium mt-0.5`}>{member.status}</p>
                            </div>
                          </div>

                          <div className="relative">
                            <button
                              onClick={() => setActiveTeamMemberId(activeTeamMemberId === member.id ? null : member.id)}
                              className="opacity-0 group-hover:opacity-100 text-[10px] text-primary font-bold hover:underline font-mono cursor-pointer"
                            >
                              Change
                            </button>
                            
                            {activeTeamMemberId === member.id && (
                              <div className="absolute right-0 top-6 w-32 bg-white rounded-lg shadow-xl border border-outline-variant z-50 p-1.5 space-y-1">
                                {['Active', 'In Focus', 'Offline', 'Blocked'].map((st) => (
                                  <button
                                    key={st}
                                    onClick={() => toggleStatus(member.id, st)}
                                    className={`w-full text-left text-[10px] font-mono px-2 py-1.5 rounded hover:bg-slate-100 flex items-center justify-between cursor-pointer ${
                                      member.status === st ? 'text-primary font-bold bg-slate-50' : 'text-on-surface'
                                    }`}
                                  >
                                    <span>{st}</span>
                                    {member.status === st && <Check className="w-3 h-3" />}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CARD 2: SPRINT 24 METRICS */}
                  <div className="p-5 bg-white rounded-xl shadow-[0_4px_20px_rgba(74,85,102,0.02)] border border-outline-variant">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-on-surface-variant">Sprint 24</h4>
                      <span className="text-[10px] font-mono bg-tertiary/10 text-tertiary px-2.5 py-0.5 rounded-full font-bold">
                        4 days left
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-xs font-semibold text-on-surface">Migration Tasks</span>
                          <span className="text-xs font-mono font-bold text-on-surface-variant">85%</span>
                        </div>
                        <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-secondary-fixed-dim rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-xs font-semibold text-on-surface">Core Refactor</span>
                          <span className="text-xs font-mono font-bold text-on-surface-variant">42%</span>
                        </div>
                        <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '42%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CARD 3: TEAM CONSISTENCY STREAK */}
                  <div className="p-5 bg-white rounded-xl shadow-[0_4px_20px_rgba(74,85,102,0.02)] border border-outline-variant">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-on-surface-variant mb-4">Team Consistency</h4>
                    
                    <div className="flex items-center gap-2 mb-4 bg-error/5 p-2 rounded-lg border border-error/10 w-fit">
                      <Flame className="w-5 h-5 text-error fill-current animate-bounce" />
                      <span className="text-xs font-bold text-on-surface">18-Day Team Streak</span>
                    </div>

                    <div className="flex gap-1.5 mb-3.5 overflow-x-auto scrollbar-hide py-1">
                      {[
                        'bg-secondary-fixed-dim',
                        'bg-secondary',
                        'bg-secondary-container',
                        'bg-secondary-fixed-dim',
                        'bg-secondary-fixed-dim',
                        'bg-secondary',
                        'bg-secondary-fixed-dim',
                        'bg-surface-container-highest',
                        'bg-secondary-fixed-dim',
                        'bg-secondary-fixed-dim',
                        'bg-secondary',
                        'bg-secondary-fixed-dim',
                        'bg-secondary-fixed-dim',
                        'bg-secondary'
                      ].map((cellBg, cellIdx) => (
                        <div 
                          key={cellIdx} 
                          className={`heatmap-cell ${cellBg} hover:scale-110 hover:ring-2 hover:ring-secondary/30 cursor-pointer transition-transform`}
                          title={`Activity index for day -${14 - cellIdx}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-mono font-bold text-on-surface-variant">94% Participation</span>
                      <span className="text-[10px] font-mono text-outline">Last 14 days</span>
                    </div>
                  </div>

                </aside>
              </>
            )}
          </main>
        </>
      )}

      {/* 4. MODAL DIALOG: NEW STANDUP CREATION */}
      {isNewStandupOpen && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl border border-outline-variant p-6 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsNewStandupOpen(false)}
              className="absolute right-4 top-4 text-on-surface-variant hover:text-on-surface p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Calendar className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary font-headline-md leading-none">Schedule Standup / Sync</h3>
                <span className="text-[10px] text-on-surface-variant font-medium block mt-1">
                  Adding to {CALENDAR_DAYS.find(d => d.date === selectedDate)?.labelFull} 1{selectedDate}, 2023
                </span>
              </div>
            </div>
            
            <hr className="border-outline-variant/60 my-4" />

            <form onSubmit={handleCreateStandup} className="space-y-4">
              
              {/* Dynamic Preview Section */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant mb-1.5 font-bold">
                  Live Card Preview
                </label>
                <div className="pl-4 border-l-2 border-primary-fixed-dim/60 bg-slate-50/50 p-3 rounded-xl border border-outline-variant/60">
                  <div className="bg-white p-3 rounded-lg border border-outline-variant flex justify-between items-center shadow-[0_2px_8px_rgba(74,85,102,0.03)]">
                    <div className="flex gap-3 items-center min-w-0">
                      {/* Dynamic Left Accent Stripe */}
                      <div className={`w-1 h-8 rounded-full flex-shrink-0 ${
                        formData.tag === '#engineering' ? 'bg-secondary' :
                        formData.tag === '#architecture' ? 'bg-primary' :
                        formData.tag === '#product' ? 'bg-tertiary-container' : 'bg-error'
                      }`}></div>
                      
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-on-surface truncate">
                          {formData.title || 'Untitled Standup Sync'}
                        </h4>
                        <div className="flex gap-1.5 mt-1">
                          <span className={`px-1.5 py-0.5 text-[9px] font-mono rounded font-medium border border-transparent ${
                            formData.tag === '#engineering' ? 'bg-secondary-container text-on-secondary-container' :
                            formData.tag === '#architecture' ? 'bg-primary-fixed text-on-primary-fixed-variant' :
                            formData.tag === '#product' ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant' :
                            'bg-error-container text-on-error-container'
                          }`}>
                            {formData.tag}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <span className="text-[10px] font-mono font-medium text-outline">{formData.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant mb-1 font-bold">
                  Standup Sync Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. API Architecture Review"
                  className="w-full bg-slate-50 border border-outline-variant rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant mb-1 font-bold">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-slate-50 border border-outline-variant rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant mb-1 font-bold">
                    Workspace Tag *
                  </label>
                  <select
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full bg-slate-50 border border-outline-variant rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition-colors"
                  >
                    <option value="#engineering">#engineering</option>
                    <option value="#architecture">#architecture</option>
                    <option value="#product">#product</option>
                    <option value="#management">#management</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewStandupOpen(false)}
                  className="px-4 py-2 border border-outline-variant text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg hover:bg-primary-container transition-colors shadow-sm active:scale-95 cursor-pointer"
                >
                  Mount to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
