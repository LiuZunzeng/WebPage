document.addEventListener('DOMContentLoaded', function() {
    // 定义伪代码的 Prism.js 自定义语言
    Prism.languages.pseudo = {
        'keyword': /\b(算法|输入|输出|如果|否则|对每个|初始化|返回|创建|保存|跳到|直至)\b/,
        'string': /“[^”]+”/,
        'comment': /\/\/.*$/
    };

    // 显式高亮伪代码块
    try {
        Prism.highlightAll();
        // 针对伪代码块单独重新高亮
        document.querySelectorAll('code.language-pseudo').forEach(block => {
            Prism.highlightElement(block);
        });
    } catch (error) {
        console.error('Prism.js 高亮失败:', error);
    }

    // 搜索功能（不变）
    document.getElementById('search').addEventListener('input', function(e) {
        const searchText = e.target.value.toLowerCase();
        const links = document.querySelectorAll('.sidebar a');
        links.forEach(link => {
            const text = link.textContent.toLowerCase();
            link.parentElement.style.display = text.includes(searchText) ? 'block' : 'none';
        });
    });

    // 子菜单切换（不变）
    document.querySelectorAll('.toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            submenu.classList.toggle('active');
            submenu.style.display = submenu.classList.contains('active') ? 'block' : 'none';
        });
    });

    // 默认展开子菜单（不变）
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.classList.add('active');
        submenu.style.display = 'block';
    });

    // JSON 折叠功能（不变）
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const isCollapsed = content.classList.contains('collapsed');

            if (isCollapsed) {
                content.classList.remove('collapsed');
                button.classList.remove('collapsed');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.classList.add('collapsed');
                button.classList.add('collapsed');
                content.style.maxHeight = '0';
            }
        });
    });

    // 全局展开/收缩按钮（不变）
    const toggleAllBtn = document.createElement('button');
    toggleAllBtn.textContent = '全部展开/收缩';
    toggleAllBtn.style.marginBottom = '1em';
    toggleAllBtn.style.padding = '0.5em 1em';
    toggleAllBtn.style.backgroundColor = '#007bff';
    toggleAllBtn.style.color = '#fff';
    toggleAllBtn.style.border = 'none';
    toggleAllBtn.style.borderRadius = '4px';
    toggleAllBtn.style.cursor = 'pointer';

    toggleAllBtn.addEventListener('click', () => {
        const allContents = document.querySelectorAll('.json-content');
        const allButtons = document.querySelectorAll('.toggle-btn');
        const allCollapsed = Array.from(allContents).every(content => content.classList.contains('collapsed'));

        allContents.forEach(content => {
            content.classList.toggle('collapsed', !allCollapsed);
            if (!allCollapsed) {
                content.style.maxHeight = '0';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
        allButtons.forEach(button => {
            button.classList.toggle('collapsed', !allCollapsed);
        });
    });

    const firstJsonContainer = document.querySelector('.json-container');
    firstJsonContainer.parentNode.insertBefore(toggleAllBtn, firstJsonContainer);
});