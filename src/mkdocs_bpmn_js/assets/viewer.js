document.addEventListener('DOMContentLoaded', async function() {
    try {
        const elements = document.querySelectorAll('.mk-bpmn-js');
        for (const element of elements) {
            const src = element.getAttribute('data-src');
            const xml = await fetch(src)
                .then(response => response.text())
                .catch(err => console.error('Error fetching BPMN XML:', err));

            const options = {}
            if (element.hasAttribute('data-width')) {
                options.width = element.getAttribute('data-width');
            }
            if (element.hasAttribute('data-height')) {
                options.height = element.getAttribute('data-height');
            }

            const viewer = new BpmnJS({ container: element, ...options });
            await viewer.importXML(xml);
            viewer.get('canvas').zoom('fit-viewport');
        }
    } catch (err) {
        console.error('Error rendering BPMN diagram:', err);
    }
});