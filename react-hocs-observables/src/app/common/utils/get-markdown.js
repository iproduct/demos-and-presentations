import Remarkable from 'remarkable';
const markDown = new Remarkable();

export default function(markdownMarkup) {
  const rawHtmlMarkup = markDown.render(markdownMarkup.toString());
  return { __html: rawHtmlMarkup };
}