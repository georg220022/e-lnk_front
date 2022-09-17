function tabsEvent(event) {
    if (event.target.closest('.tabs__button')) {
        const currentBtn = event.target.closest('.tabs__button');
        const tabBtns = currentBtn.closest('.tabs').querySelectorAll('.tabs__button');

        const allIds = [];
        tabBtns.forEach(tabBtn => allIds.push(tabBtn.getAttribute('data-tab')));
        const tabsItems = [];
        for (const id of allIds) {
            tabsItems.push(currentBtn.closest('.tabs-wrapper').querySelector(id));
        }

        const tabId = currentBtn.getAttribute('data-tab');
        const currentItem = currentBtn.closest('.tabs-wrapper').querySelector(tabId);

        if (!currentBtn.classList.contains('tabs__button--active')) {
            tabBtns.forEach(tabBtn => {
                tabBtn.classList.remove('tabs__button--active');
            });

            tabsItems.forEach(item => {
                item.classList.remove('tabs__item--active');
            });

            currentBtn.classList.add('tabs__button--active');
            currentItem.classList.add('tabs__item--active');
        };
    };
};

export default tabsEvent;