export function bindToComponent(component, ...methods){
    methods.forEach(function(method) {
        component[method] = component[method].bind(component)
    });
}