'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface EditorProps {
    content: string;
    onChange: (content: string) => void;
}

const Editor = ({ content, onChange }: EditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link.configure({
                openOnClick: false,
            }),
            Placeholder.configure({
                placeholder: 'Write your story here...',
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
    });

    if (!editor) {
        return null;
    }

    const addImage = async () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    return (
        <div className="border rounded-lg overflow-hidden bg-background">
            <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/30">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-muted ${editor.isActive('bold') ? 'bg-muted' : ''}`}
                >
                    <Bold className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-muted ${editor.isActive('italic') ? 'bg-muted' : ''}`}
                >
                    <Italic className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-muted ${editor.isActive('bulletList') ? 'bg-muted' : ''}`}
                >
                    <List className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-muted ${editor.isActive('orderedList') ? 'bg-muted' : ''}`}
                >
                    <ListOrdered className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`p-2 rounded hover:bg-muted ${editor.isActive('blockquote') ? 'bg-muted' : ''}`}
                >
                    <Quote className="h-4 w-4" />
                </button>
                <div className="w-px h-6 bg-border mx-1 my-1" />
                <button onClick={setLink} className={`p-2 rounded hover:bg-muted ${editor.isActive('link') ? 'bg-muted' : ''}`}>
                    <LinkIcon className="h-4 w-4" />
                </button>
                <button onClick={addImage} className="p-2 rounded hover:bg-muted">
                    <ImageIcon className="h-4 w-4" />
                </button>
                <div className="w-px h-6 bg-border mx-1 my-1" />
                <button onClick={() => editor.chain().focus().undo().run()} className="p-2 rounded hover:bg-muted">
                    <Undo className="h-4 w-4" />
                </button>
                <button onClick={() => editor.chain().focus().redo().run()} className="p-2 rounded hover:bg-muted">
                    <Redo className="h-4 w-4" />
                </button>
            </div>
            <EditorContent editor={editor} className="p-4 min-h-[400px] prose prose-sm max-w-none focus:outline-none" />
            <style jsx global>{`
        .ProseMirror:focus {
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
      `}</style>
        </div>
    );
};

export default Editor;
