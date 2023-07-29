import axios from 'axios'
import React, { useCallback, useMemo, useRef } from 'react'

import ReactDatePicker from 'react-datepicker'
import ReactQuill, { Quill } from 'react-quill'
import ImageResize from "quill-image-resize-module-react"

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'align',
    'image',
]

Quill.register("modules/imageResize", ImageResize)

const ScheduleContentForm = ({ title, setTitle, date, setDate, content, setContent, memorizedKo }) => {
    const quillEditor = useRef(null)
    const fileInput = useRef(null)

    const imageHandler = useCallback((e) => {
        fileInput.current.click()
    }, [fileInput])

    const changeHandler = useCallback(async (e) => {
        if(e.target.files === null) return
        const file = e.target.files[0]

        // file type이 이미지 일때만 업로드 되게
        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await axios.post('/file', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            const url = `${import.meta.env.VITE_SERVER_HOST}${res.data.path}`
            const editor = quillEditor.current.getEditor()
            const range = editor.getSelection(true)

            editor.insertEmbed(range.index, 'image', url)
            editor.setSelection(range.index + 1)
        } catch (error) {
            console.log(error)
        }
    }, [quillEditor])

    const colorHandler = useCallback((e) => {
        console.log(e)

    }, [])

    const backgroundHandler = useCallback((e) => {
        console.log(e)

    }, [])

    // toolbar option: https://quilljs.com/docs/modules/toolbar/
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: '1' }, { header: '2' }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
                ['image'],
                [{ 'color': [] }, { 'background': [] }],
            ],
            handlers: { 
                image: imageHandler,
                color: colorHandler,
                background: backgroundHandler,
            },
        },
            clipboard: {
            matchVisual: false,
        },
        imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize", "Toolbar"],
        },
    }), [])

  return (
    <>
        {/* 일정명, 일시 */}
        <div className='mb-4'>
            <div className='flex gap-4 mb-4'>
                <h4 className='py-1 min-w-[50px] text-left font-semibold'>일정명</h4>
                <input 
                    type='text'
                    value={title}
                    onChange={setTitle}
                    className='border p-1 flex-1'
                />
            </div>
            <div className='flex gap-4'>
                <h4 className='py-1 min-w-[50px] text-left font-semibold'>일시</h4>
                <div className='flex-1 custom-datepicker'>
                    <ReactDatePicker
                        placeholder="일정 상세 작성"
                        dateFormat="yyyy년 MM월 dd일"
                        className='p-1 border text-center w-full'
                        locale={memorizedKo}
                        selected={date}
                        onChange={setDate}
                        preserveWhitespace
                        // showTimeSelect
                    />
                </div>
            </div>
        </div>
        {/* 상세 내용 */}
        <div> 
            {/* <h4>일정상세</h4> */}
            <input 
                type="file"
                hidden 
                ref={fileInput}
                onChange={changeHandler}
            />
            <ReactQuill 
                ref={quillEditor}
                theme="snow" 
                value={content}
                modules={modules}
                formats={formats}
                placeholder='일정상세'
                onChange={setContent} 
            />
        </div>
    </>
  )
}

export default React.memo(ScheduleContentForm)