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
    <div className="px-2 tablet:px-0 w-90.5 tablet:w-xl laptop:w-163 mx-auto text-dark-black  leading-6.5 tracking-tight tablet:leading-7.75  mb-6 tablet:mb-8 text-md font-normal tablet:text-xl">{parse(data.text, options)}</div>
  )
}