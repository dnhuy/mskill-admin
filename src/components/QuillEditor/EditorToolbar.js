import { getUploadImageUrl, uploadToS3 } from '@/api/upload';
import ImageResize from 'quill-image-resize-module-react';
import { Quill } from 'react-quill';
import './styles.css';

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path className="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path className="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
  </svg>
);

// Undo and redo functions for Custom Toolbar
// function undoChange() {
//   this.quill.history.undo();
// }
// function redoChange() {
//   this.quill.history.redo();
// }

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size');
// Size.whitelist = ["extra-small", "small", "medium", "large"]
Size.whitelist = [
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '18',
  '20',
  '22',
  '24',
  '26',
  '28',
  '30',
  '36',
  '48',
  '60',
  '72',
  '96',
];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font');
Font.whitelist = ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida'];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
// export const modules = {
//   toolbar: {
//     container: "#toolbar",
//     handlers: {
//       undo: undoChange,
//       redo: redoChange,
//       image: imageHandler
//     }
//   },
//   history: {
//     delay: 500,
//     maxStack: 100,
//     userOnly: true
//   }
// };

// Formats objects for setting up the Quill editor
export const formats = [
  'header',
  'font',
  'size',
  'symbol',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'script',
  'blockquote',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'code-block',
];

Quill.register('modules/imageResize', ImageResize);

const imageHandler = (editorRef) => {
  if (editorRef) {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      let formData = new FormData();
      formData.append('image', file);
      const data = {
        filename: file.name,
        size: file.size,
        contentType: file.type,
      };
      getUploadImageUrl(data).then((res) => {
        const urlRes = res?.data?.url;
        const url = urlRes.substring(0, urlRes.indexOf('?'));
        uploadToS3(url, file).then((resp) => {
          const range = editorRef?.getEditorSelection();
          editorRef?.getEditor()?.insertEmbed(range.index, 'image', url);
        });
      });
    };
  }
};

export const modules = (editorRef, id) => {
  return {
    toolbar: {
      container: '#' + id,
      size: [
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '18',
        '20',
        '22',
        '24',
        '26',
        '28',
        '30',
        '36',
        '48',
        '60',
        '72',
        '96',
      ],
      handlers: {
        image: imageHandler(editorRef),
      },
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
  };
};

// Quill Toolbar component
export const QuillToolbar = ({ id = 'toolbar' }) => (
  <div id={id}>
    <span className="ql-formats">
      <select className="ql-font">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size" defaultValue="14">
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="22">22</option>
        <option value="24">24</option>
        <option value="26">26</option>
        <option value="28">28</option>
        <option value="30">30</option>
        <option value="36">36</option>
        <option value="48">48</option>
        <option value="60">60</option>
        <option value="72">72</option>
        <option value="96">96</option>
      </select>
      <select className="ql-header">
        <option value="0">Normal</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>
        <option value="5">Heading 5</option>
        <option value="6">Heading 6</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    <span className="ql-formats">
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
      <button className="ql-direction" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span>
    <span className="ql-formats">
      <button className="ql-formula" />
      <button className="ql-code-block" />
      <button className="ql-clean" />
    </span>
    {/* <span className="ql-formats">
      <button className="ql-undo">
        <CustomUndo />
      </button>
      <button className="ql-redo">
        <CustomRedo />
      </button>
    </span> */}
  </div>
);

export default QuillToolbar;
