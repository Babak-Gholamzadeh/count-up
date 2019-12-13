; ($ => {
    /*
     * @description     Start counting up
     * @param   {HTML Element} counterElement - The element which the number of counting must be shown in it
     * @param   {number} finalNumber - The final number that the counter must reach it
     * @param   {number} duration - The duration of counting
    */
    const startCounting = ({counterElement, finalNumber, duration}) => {
        // Calculate the step that must be counted in each 10ms
        var step = finalNumber / (duration / 10);
        var counter = 0;
        var counting = setInterval(() => {
            counter += step;
            if (counter >= finalNumber) {
                counter = finalNumber;
                counterElement.text(Math.floor(counter));
                clearInterval(counting);
            }
            counterElement.text(Math.floor(counter));
        }, 10);
    }

    // Store the data of each counter element as an object in an array reduce the DOM request for fetching the data
    var counters = [];
    $('.counter').each(function () {
        var counterElement = $(this);
        var duration = +counterElement.data('duration') || 1000;
        var scrollElement = counterElement.data('scroll-element') || 'end';
        var finalNumber = counterElement.text();
        counterElement.text('0');
        switch (scrollElement) {
            case 'begin':
                scrollElement = $(this).offset().top;
                break;
            case 'middle':
                scrollElement = $(this).offset().top - (window.innerHeight / 2);
                break;
            case 'end':
            default:
                scrollElement = $(this).offset().top - window.innerHeight;
                break;
        }
        counters.push({
            counterElement,
            finalNumber,
            duration,
            scrollElement,
            done: false
        });
    });

    // Because the scroll event dones't trigger on page load,
    // so the function should be invoked and check the position of scroll
    runOnScroll();
    $(window).scroll(runOnScroll);
    function runOnScroll() {
        var scrollTop = $(document).scrollTop();
        for(let counter of counters) {
            if(!counter.done && scrollTop >= counter.scrollElement) {
                startCounting(counter);
                counter.done = true;
            }
        }
    }
})(jQuery);