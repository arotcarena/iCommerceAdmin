import { changeHTMLAttribute } from "functions/dom/htmlAttributesChanger";

describe('changeHTMLAttribute', () => {
    it('should change html attribute correctly', () => {
        changeHTMLAttribute('attr', 'test');
        expect(document.documentElement.getAttribute('attr')).toEqual('test');
    })

    it('should modify html attribute correctly', () => {
        changeHTMLAttribute('attr', 'test');
        changeHTMLAttribute('attr', 'test2');
        expect(document.documentElement.getAttribute('attr')).toEqual('test2');
    })
})
