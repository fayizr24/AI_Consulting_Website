document.querySelectorAll('.cp-faq-q').forEach(function(question) {
    question.addEventListener('click', function() {
        const item = this.closest('.cp-faq-item');
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.cp-faq-item.open').forEach(function(openItem) {
            openItem.classList.remove('open');
        });

        if (!isOpen) {
            item.classList.add('open');
        }
    });
});
