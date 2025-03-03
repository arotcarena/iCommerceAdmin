import { render, screen } from "@testing-library/react"
import { lightSearchedPart } from "functions/stringHelpers/searchedPartLighter"

const TestComponent = ({text}: {text: string}) => {
    return (
        <div dangerouslySetInnerHTML={{__html: text}}></div>
    )
}

describe('searchedPartLighter', () => {
    const setUp = (text: string): HTMLElement => {
        const {container} = render(<TestComponent text={text} />);
        return container;
    }

    it('should return null when not match', () => {
        const value = lightSearchedPart('Hello world', 'azer');
        expect(value).toBeNull();
    })

    it('should return a string when match', () => {
        const value = lightSearchedPart('Hello world', 'orl');
        expect(value).not.toBeNull();
    })

    it('should render correctly', () => {
        const text = lightSearchedPart('Hello World', 'ell');
        if(!text) throw new Error('text should not be null');
        
        const container = setUp(text);

        expect(container).toMatchInlineSnapshot(`
<div>
  <div>
    H
    <strong
      style="background-color: yellow;"
    >
      ell
    </strong>
    o World
  </div>
</div>
`);
    })
})
