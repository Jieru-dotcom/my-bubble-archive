// 初始化网页逻辑
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('artist-name').innerText = bubbleConfig.artistName;
    renderMessages(bubbleRawData);

    // 搜索过滤
    document.getElementById('search-input').addEventListener('input', (e) => {
        const keyword = e.target.value.trim().toLowerCase();
        const filtered = bubbleRawData.filter(item => 
            item.textKo.toLowerCase().includes(keyword) || 
            item.textZh.toLowerCase().includes(keyword)
        );
        renderMessages(filtered);
    });

    // 日期跳转
    document.getElementById('date-picker').addEventListener('change', (e) => {
        const selectedDate = e.target.value; // YYYY-MM-DD
        const filtered = bubbleRawData.filter(item => item.date === selectedDate);
        renderMessages(filtered);
    });

    // 随机一条消息
    document.getElementById('random-msg-btn').addEventListener('click', () => {
        if(!bubbleRawData.length) return;
        const randomItem = bubbleRawData[Math.floor(Math.random() * bubbleRawData.length)];
        renderMessages([randomItem]);
    });

    // 随机一天聊天
    document.getElementById('random-day-btn').addEventListener('click', () => {
        const dates = [...new Set(bubbleRawData.map(item => item.date))];
        if(!dates.length) return;
        const randomDate = dates[Math.floor(Math.random() * dates.length)];
        const filtered = bubbleRawData.filter(item => item.date === randomDate);
        renderMessages(filtered);
    });
});

// 核心渲染函数
function renderMessages(dataList) {
    const container = document.getElementById('chat-messages');
    container.innerHTML = '';
    let lastDate = '';

    dataList.forEach((msg, index) => {
        // 自动插入日期分割线
        if (msg.date !== lastDate) {
            const divider = document.createElement('div');
            divider.className = 'date-divider';
            divider.innerText = msg.date;
            container.appendChild(divider);
            lastDate = msg.date;
        }

        const row = document.createElement('div');
        row.className = `message-row ${msg.sender}`;

        // 拼接时间与原图去重查看结构
        const metaHtml = `
            <div class="meta-info">
                ${msg.time}
                ${msg.srcScreenshot ? `<span class="screenshot-link" onclick="viewImage('media/\${msg.srcScreenshot}')">查看原图</span>` : ''}
            </div>
        `;

        // 根据媒体类型生成内部 HTML
        let contentHtml = '';
        if (msg.type === 'text') {
            contentHtml = `<div>${msg.textKo}</div>`;
            if (msg.textZh) {
                contentHtml += `
                    <button class="translate-btn" onclick="toggleTrans(${index})">翻译 🌐</button>
                    <div class="translation" id="trans-${index}" style="display:none;">${msg.textZh}</div>
                `;
            }
        } else if (msg.type === 'image') {
            contentHtml = `<img src="media/${msg.mediaFile}" onclick="viewImage(this.src)">`;
        } else if (msg.type === 'audio') {
            contentHtml = `<audio controls src="media/${msg.mediaFile}"></audio>`;
        } else if (msg.type === 'video') {
            contentHtml = `<video controls src="media/${msg.mediaFile}"></video>`;
        }

        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.innerHTML = contentHtml;

        if (msg.sender === 'artist') {
            row.appendChild(bubble);
            row.insertAdjacentHTML('beforeend', metaHtml);
        } else {
            row.insertAdjacentHTML('afterbegin', metaHtml);
            row.appendChild(bubble);
        }

        container.appendChild(row);
    });
}

// 翻译切换控制
function toggleTrans(id) {
    const el = document.getElementById(`trans-${id}`);
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

// 放大图查看
function viewImage(src) {
    const modal = document.getElementById('image-modal');
    document.getElementById('modal-img').src = src;
    modal.style.display = 'flex';
}
