import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';
import { AnnotationPopover } from './AnnotationPopover';

export const ClientParagraph = ({ data }: { data: { text: string } }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (
        domNode instanceof Element && 
        domNode.name === 'mark' && 
        domNode.attribs['data-term']
      ) {
        const term = domNode.attribs['data-term'];
        const definition = domNode.attribs['data-definition'];

        return (
          <AnnotationPopover term={term} definition={definition}>
            {domToReact(domNode.children as any, options)}
          </AnnotationPopover>
        );
      }
    }
  };

  return (
    <p className="paragraph-text mb-6 w-[86.5%] ms-auto me-auto tablet:w-143 laptop:w-162 laptop:text-lg laptop:leading-7">{parse(data.text, options)}</p>
  )
}