document.querySelectorAll('.like-btn').forEach((button) => {
  const likeText = button.closest('.post-card')?.querySelector('.likes-count');
  if (!likeText) return;

  let liked = button.classList.contains('active');
  let likeValue = Number.parseFloat(likeText.textContent) || 18.4;

  const formatLikes = (value) => `${value.toFixed(1)}k likes`;

  button.addEventListener('click', () => {
    liked = !liked;
    button.classList.toggle('active', liked);

    if (liked) {
      likeText.textContent = formatLikes(likeValue);
      button.querySelector('.label').textContent = 'Like';
    } else {
      const nextValue = likeValue + 0.1;
      likeText.textContent = formatLikes(nextValue);
      likeValue = nextValue;
      button.querySelector('.label').textContent = 'Liked';
    }
  });
});

const navButtons = document.querySelectorAll('.nav-item');
const feedPanel = document.querySelector('.feed-panel');
const appBody = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const themeIcon = document.querySelector('.theme-icon');
const createButton = document.querySelector('.compose-btn');
const createModal = document.getElementById('createModal');
const createClose = document.querySelector('.create-close');
const publishPostBtn = document.getElementById('publishPostBtn');
const postComposer = document.getElementById('postComposer');
const trendGrid = document.getElementById('trendGrid');
const commentDrawer = document.getElementById('commentDrawer');
const notificationPopup = document.getElementById('notificationPopup');
const commentTitle = document.querySelector('.comment-header-title');
const commentList = document.querySelector('.comment-list');
const commentInput = document.querySelector('.comment-input');
const commentSend = document.querySelector('.comment-send');
const commentClose = document.querySelector('.comment-close');
const notificationClose = document.querySelector('.notification-close');
const messagesList = document.getElementById('messagesList');
const chatName = document.getElementById('chatName');
const chatStatus = document.getElementById('chatStatus');
const chatThread = document.getElementById('chatThread');
const chatInput = document.querySelector('.chat-input');
const chatSend = document.querySelector('.chat-send');
const chatBack = document.querySelector('.chat-back');

const toggleFollow = (button) => {
  const isFollowing = button.classList.toggle('following');
  button.textContent = isFollowing ? 'Following' : 'Follow';
};

const applyTheme = (isDark) => {
  appBody.classList.toggle('dark-theme', isDark);
  const label = isDark ? 'Light' : 'Dark';
  const icon = isDark ? '☀' : '☾';

  if (themeLabel) themeLabel.textContent = label;
  if (themeIcon) themeIcon.textContent = icon;
  localStorage.setItem('rize-theme', isDark ? 'dark' : 'light');
};

const savedTheme = localStorage.getItem('rize-theme');
if (savedTheme === 'dark') {
  applyTheme(true);
} else {
  applyTheme(false);
}

themeToggle?.addEventListener('click', () => {
  const isDark = !appBody.classList.contains('dark-theme');
  applyTheme(isDark);
});

const trendSuggestions = [
  { title: 'Golden hour', detail: 'Warm light, low angle shots, and reflective captions.' },
  { title: 'Slow living', detail: 'Quiet routines, café moments, and softer storytelling.' },
  { title: 'City strolls', detail: 'Street textures, people in motion, and urban details.' },
  { title: 'At home', detail: 'Cozy corners, recipes, and everyday rituals.' },
  { title: 'Weekend reset', detail: 'Brunch, books, and a slower pace for the day.' }
];

function renderTrends() {
  if (!trendGrid) return;

  trendGrid.innerHTML = trendSuggestions
    .map(
      (trend, index) => `
        <button class="trend-chip ${index === 0 ? 'selected' : ''}" type="button" data-trend="${trend.title}">
          <strong>${trend.title}</strong>
          <span>${trend.detail}</span>
        </button>
      `
    )
    .join('');

  trendGrid.querySelectorAll('.trend-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      trendGrid.querySelectorAll('.trend-chip').forEach((item) => item.classList.remove('selected'));
      chip.classList.add('selected');

      const selectedTrend = chip.dataset.trend;
      if (postComposer && !postComposer.value.trim()) {
        postComposer.value = `A little ${selectedTrend.toLowerCase()} energy for today...`;
      }
    });
  });
}

function openCreateModal() {
  createModal?.classList.add('open');
  createModal?.setAttribute('aria-hidden', 'false');
  setTimeout(() => postComposer?.focus(), 100);
}

function closeCreateModal() {
  createModal?.classList.remove('open');
  createModal?.setAttribute('aria-hidden', 'true');
}

function addNewPost() {
  const feedStream = document.querySelector('.feed-stream');
  if (!feedStream) return;

  const selectedTrend = document.querySelector('.trend-chip.selected')?.dataset.trend || 'Slow living';
  const rawText = postComposer?.value.trim();
  const text = rawText || `A little ${selectedTrend.toLowerCase()} energy for today — making space for the small things.`;

  const newPost = document.createElement('article');
  newPost.className = 'post-card';
  newPost.innerHTML = `
    <header class="post-header">
      <div class="user-group">
        <div class="avatar">R</div>
        <div class="user-meta">
          <h1>Ruby Lane</h1>
          <p>@rubylane • just now</p>
        </div>
      </div>
      <button class="follow-btn" type="button">Follow</button>
    </header>

    <section class="post-body">
      <p class="caption">${text}</p>
      <div class="hashtags">#${selectedTrend.replace(/\s+/g, '')} #DailyLife #NewMoment</div>
    </section>

    <section class="media-area" aria-label="New social post artwork">
      <div class="media-badge">Fresh post</div>
      <div class="scene scene-one">
        <div class="sun"></div>
        <div class="mountain mountain-left"></div>
        <div class="mountain mountain-right"></div>
        <div class="lake"></div>
      </div>
    </section>

    <section class="engagement-bar" aria-label="Post engagement">
      <span class="stats likes-count">0.1k likes</span>
      <span class="stats">0 comments</span>
      <span class="stats">0 shares</span>
    </section>

    <nav class="action-row" aria-label="Post actions">
      <button class="action-btn like-btn" type="button" aria-label="Like post">
        <span class="icon">♥</span>
        <span class="label">Like</span>
      </button>
      <button class="action-btn" type="button" aria-label="Comment on post">
        <span class="icon">💬</span>
        <span class="label">Comment</span>
      </button>
      <button class="action-btn" type="button" aria-label="Share post">
        <span class="icon">↗</span>
        <span class="label">Share</span>
      </button>
    </nav>
  `;

  feedStream.prepend(newPost);
  document.querySelectorAll('.follow-btn').forEach((button) => {
    button.addEventListener('click', () => toggleFollow(button));
  });

  document.querySelectorAll('.action-btn[aria-label="Comment on post"]').forEach((button) => {
    button.addEventListener('click', () => {
      const postCard = button.closest('.post-card');
      openComments(postCard);
    });
  });

  document.querySelectorAll('.like-btn').forEach((button) => {
    const likeText = button.closest('.post-card')?.querySelector('.likes-count');
    if (!likeText) return;

    let liked = button.classList.contains('active');
    let likeValue = Number.parseFloat(likeText.textContent) || 0.1;

    button.addEventListener('click', () => {
      liked = !liked;
      button.classList.toggle('active', liked);
      likeText.textContent = liked ? `${likeValue.toFixed(1)}k likes` : `${(likeValue + 0.1).toFixed(1)}k likes`;
      if (liked) {
        button.querySelector('.label').textContent = 'Like';
      } else {
        button.querySelector('.label').textContent = 'Liked';
      }
    });
  });

  closeCreateModal();
  if (postComposer) postComposer.value = '';
}

createButton?.addEventListener('click', openCreateModal);
createClose?.addEventListener('click', closeCreateModal);
publishPostBtn?.addEventListener('click', addNewPost);
document.querySelector('[data-close-create]')?.addEventListener('click', closeCreateModal);
createModal?.addEventListener('click', (event) => {
  if (event.target === createModal) {
    closeCreateModal();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && createModal?.classList.contains('open')) {
    closeCreateModal();
  }
});

renderTrends();

const conversations = [
  {
    name: 'Maya Chen',
    avatar: 'M',
    preview: 'I saved that café photo for us.',
    time: '2026-09-27T18:35:00',
    unread: 2,
    status: 'Online',
    messages: [
      { sender: 'incoming', text: 'I am still thinking about our walk yesterday. It felt so easy.' },
      { sender: 'outgoing', text: 'Me too. I loved the quiet part near the river.' },
      { sender: 'incoming', text: 'I saved that café photo for us. We should definitely go back.' }
    ]
  },
  {
    name: 'Noah Brooks',
    avatar: 'N',
    preview: 'You should come to the gallery opening with me.',
    time: '2026-09-27T17:10:00',
    unread: 1,
    status: 'Active now',
    messages: [
      { sender: 'incoming', text: 'You should come to the gallery opening with me this Friday.' },
      { sender: 'outgoing', text: 'That sounds lovely. Send me the details.' },
      { sender: 'incoming', text: 'Absolutely. I think you’ll love it.' }
    ]
  },
  {
    name: 'Alicia Moore',
    avatar: 'A',
    preview: 'Can we make dinner plans this week?',
    time: '2026-09-27T15:20:00',
    unread: 0,
    status: 'Seen 5m ago',
    messages: [
      { sender: 'incoming', text: 'Can we make dinner plans this week? I miss your cooking.' },
      { sender: 'outgoing', text: 'Of course. I’m free Thursday night.' },
      { sender: 'incoming', text: 'Perfect. I’ll bring dessert.' }
    ]
  },
  {
    name: 'Jordan Lee',
    avatar: 'J',
    preview: 'I sent you that playlist from last night.',
    time: '2026-09-26T18:45:00',
    unread: 0,
    status: 'Typing…',
    messages: [
      { sender: 'incoming', text: 'I sent you that playlist from last night. It reminded me of you.' },
      { sender: 'outgoing', text: 'Thank you, I’m listening to it right now.' }
    ]
  },
  {
    name: 'Lena Hart',
    avatar: 'L',
    preview: 'Let’s do a slow brunch this weekend.',
    time: '2026-09-25T09:30:00',
    unread: 0,
    status: 'Offline',
    messages: [
      { sender: 'incoming', text: 'Let’s do a slow brunch this weekend. I know a quiet place by the park.' },
      { sender: 'outgoing', text: 'That sounds perfect. Saturday morning works for me.' }
    ]
  }
];

const formatConversationTime = (isoDate) => {
  const now = new Date();
  const date = new Date(isoDate);
  const diffMinutes = Math.max(1, Math.round((now - date) / 60000));

  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffMinutes < 1440) return `${Math.round(diffMinutes / 60)}h ago`;
  return `${Math.round(diffMinutes / 1440)}d ago`;
};

const selectConversation = (name) => {
  const selected = conversations.find((conversation) => conversation.name === name);
  if (!selected || !chatName || !chatStatus || !chatThread) return;

  chatName.textContent = selected.name;
  chatStatus.textContent = selected.status;
  const avatarNode = document.querySelector('.chat-avatar');
  if (avatarNode) avatarNode.textContent = selected.avatar;

  chatThread.innerHTML = selected.messages
    .map((message) => `<div class="chat-bubble ${message.sender}">${message.text}</div>`)
    .join('');

  document.querySelectorAll('.conversation-item').forEach((entry) => {
    entry.classList.toggle('active', entry.dataset.name === selected.name);
  });
};

const renderMessages = () => {
  if (!messagesList) return;

  const ordered = [...conversations].sort((a, b) => new Date(b.time) - new Date(a.time));
  messagesList.innerHTML = ordered
    .map((conversation) => `
      <div class="conversation-item ${conversation.name === chatName?.textContent ? 'active' : ''}" data-name="${conversation.name}">
        <div class="conversation-avatar">${conversation.avatar}</div>
        <div class="conversation-copy">
          <strong>${conversation.name}</strong>
          <p>${conversation.preview}</p>
        </div>
        <div class="conversation-meta">
          <span class="conversation-time">${formatConversationTime(conversation.time)}</span>
          ${conversation.unread ? `<span class="unread-badge">${conversation.unread}</span>` : ''}
        </div>
      </div>
    `)
    .join('');

  const items = document.querySelectorAll('.conversation-item');
  items.forEach((item) => {
    item.addEventListener('click', () => {
      selectConversation(item.dataset.name);
    });
  });

  if (!document.querySelector('.conversation-item.active')) {
    selectConversation(ordered[0]?.name);
  }
};

const sendMessage = () => {
  const inputValue = chatInput?.value.trim();
  if (!inputValue || !chatName || !chatThread) return;

  const activeName = chatName.textContent.trim();
  const activeConversation = conversations.find((conversation) => conversation.name === activeName);
  if (!activeConversation) return;

  activeConversation.messages.push({ sender: 'outgoing', text: inputValue });
  activeConversation.preview = inputValue;
  activeConversation.time = new Date().toISOString();
  activeConversation.unread = 0;

  chatThread.insertAdjacentHTML(
    'beforeend',
    `<div class="chat-bubble outgoing">${inputValue}</div>`
  );

  if (chatInput) chatInput.value = '';
  renderMessages();
};

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    navButtons.forEach((item) => item.classList.toggle('active', item === button));

    if (button.dataset.view === 'explore') {
      appBody.classList.remove('messages-mode');
      feedPanel.classList.add('explore-mode');
      feedPanel.classList.remove('messages-mode');
      notificationPopup?.classList.remove('open');
    } else if (button.dataset.view === 'notifications') {
      appBody.classList.remove('messages-mode');
      feedPanel.classList.remove('explore-mode');
      feedPanel.classList.remove('messages-mode');
      notificationPopup?.classList.add('open');
    } else if (button.dataset.view === 'messages') {
      appBody.classList.add('messages-mode');
      appBody.classList.remove('explore-mode');
      feedPanel.classList.remove('explore-mode');
      feedPanel.classList.remove('messages-mode');
      notificationPopup?.classList.remove('open');
      renderMessages();
      if (conversations.length > 0) {
        selectConversation(conversations[0].name);
      }
    } else {
      appBody.classList.remove('messages-mode');
      appBody.classList.remove('explore-mode');
      feedPanel.classList.remove('explore-mode');
      feedPanel.classList.remove('messages-mode');
      notificationPopup?.classList.remove('open');
    }
  });
});

chatBack?.addEventListener('click', () => {
  appBody.classList.remove('messages-mode');
  appBody.classList.remove('explore-mode');
  feedPanel?.classList.remove('messages-mode');
  document.querySelector('[data-view="home"]').classList.add('active');
  navButtons.forEach((item) => {
    if (item.dataset.view !== 'home') item.classList.remove('active');
  });
});

chatSend?.addEventListener('click', sendMessage);
chatInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

renderMessages();

document.querySelectorAll('.follow-btn').forEach((button) => {
  button.addEventListener('click', () => toggleFollow(button));
});

const motionCards = document.querySelectorAll('.topbar, .profile-card, .post-card, .mini-post');
motionCards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 10;
    const rotateX = (0.5 - y) * 9;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

const openComments = (postCard) => {
  const postOwner = postCard?.querySelector('.user-meta h1')?.textContent || 'This post';
  if (commentTitle) {
    commentTitle.textContent = `Comments · ${postOwner}`;
  }
  commentDrawer?.classList.add('open');
  setTimeout(() => commentInput?.focus(), 120);
};

const closeComments = () => {
  commentDrawer?.classList.remove('open');
};

document.querySelectorAll('.action-btn[aria-label="Comment on post"]').forEach((button) => {
  button.addEventListener('click', () => {
    const postCard = button.closest('.post-card');
    openComments(postCard);
  });
});

commentClose?.addEventListener('click', closeComments);
notificationClose?.addEventListener('click', () => notificationPopup?.classList.remove('open'));

commentSend?.addEventListener('click', () => {
  const message = commentInput?.value.trim();
  if (!message) return;

  const newComment = document.createElement('div');
  newComment.className = 'comment-item';
  newComment.innerHTML = `
    <div class="comment-avatar">Y</div>
    <div class="comment-copy">
      <strong>You</strong>
      <p>${message}</p>
    </div>
  `;

  commentList?.appendChild(newComment);
  if (commentInput) {
    commentInput.value = '';
    commentInput.focus();
  }
});

commentInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    commentSend?.click();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeComments();
  }
});
