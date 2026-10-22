// 初始化网页逻辑
document.addEventListener("DOMContentLoaded", () => {
    // 渲染页面顶部的聊天对象名字
    document.getElementById('artist-name').innerText = bubbleConfig.artistName;
    renderMessages(bubbleRawData);

    // 搜索过滤功能
    document.getElementById('search-input').addEventListener('input', (e) => {
        const keyword = e.target.value.trim().toLowerCase();
        const filtered = bubbleRawData.filter(item => 
            item.textKo.toLowerCase().includes(keyword) || 
            item.textZh.toLowerCase().includes(keyword)
        );
        renderMessages(filtered);
    });

    // 日期跳转功能
    document.getElementById('date-picker').addEventListener('change', (e) => {
        const selectedDate = e.target.value;
        const filtered = bubbleRawData.filter(item => item.date === selectedDate);
        renderMessages(filtered);
    });

    // 随机抽取一条消息
    document.getElementById('random-msg-btn').addEventListener('click', () => {
        if(!bubbleRawData.length) return;
        const randomItem = bubbleRawData[Math.floor(Math.random() * bubbleRawData.length)];
        renderMessages([randomItem]);
    });

    // 随机回顾完整的一天
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
    let lastSender = ''; // 用于记录上一条消息是谁发的

    dataList.forEach((msg, index) => {
        // 1. 自动插入日期分割线
        if (msg.date !== lastDate) {
            const divider = document.createElement('div');
            divider.className = 'date-divider';
            divider.innerText = msg.date;
            container.appendChild(divider);
            lastDate = msg.date;
            lastSender = ''; // 换天了，重新计算连续发送
        }

        // 2. 如果是艺人发的，且上一条不是他发的，需要显示名字
        if (msg.sender === 'artist' && msg.sender !== lastSender) {
            const nameEl = document.createElement('div');
            nameEl.className = 'artist-name-label';
            nameEl.innerText = bubbleConfig.artistName;
            container.appendChild(nameEl);
        }
        lastSender = msg.sender; // 更新发送者记录

        // 3. 构造消息行布局
        const row = document.createElement('div');
        row.className = `message-row ${msg.sender}`;

        // 4. 附属信息（时间、查看原图）
        const metaHtml = `
            <div class="meta-info">
                ${msg.time}
                ${msg.srcScreenshot ? `<span class="screenshot-link" onclick="viewImage('media/\${msg.srcScreenshot}')">查看原图</span>` : ''}
            </div>
        `;

        // 5. 根据媒体类型生成内部内容
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

        // 6. 区分左右对齐拼接
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
