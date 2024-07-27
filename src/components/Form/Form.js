import React, { useState } from 'react'
import photo from "../../assets/choose.png"

export default function Form() {
    const [selectedItem, setSelectedItem] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [list,setList] = useState([])
    const handleClickSub = (e) => {
        e.preventDefault()
        const obj = {
            id:list.length + 1,
            title:e.target.text.value,
            isComplated:false
        }
        setList([...list,obj])
        e.target.reset()
    }

    const handleDelete = (id) => {
        const newList = list.filter(item => item.id !== id)
        setList(newList)
    }
    const handleEdit = (item) => {
        setSelectedItem(item)
        setShowModal(true)
    }
    const handleUpdate = () => {
        const updatedList = list.map(item => {
            if (item.id === selectedItem.id) {
                return { ...item, title: selectedItem.title }
            }
            return item
        })
        setList(updatedList)
        setShowModal(false)
    }

  return (
    <>
        <form onSubmit={handleClickSub} className='w-[50%] mx-auto mt-[20px] p-5 bg-white rounded-[10px]'>
            <div className="flex justify-between">
              <h2 className="text-[25px] font-semibold text-violet-600">Create your Todo</h2>
              <input type="search" className="search-input w-[30%] p-[5px] outline-none border-[1px] border-violet-300 border-dashed rounded-[12px] text-violet-400 focus:border-violet-500 focus:shadow-lg" placeholder="Search"/>
            </div>
            <div className="flex justify-between mt-[20px]">
                <input name='text' className="w-[72%] p-[12px] outline-none border-[2px] border-violet-300 rounded-[12px] text-violet-400 focus:border-violet-500 focus:shadow-lg" type="text" placeholder="Enter name of your Todo...."/>
                <button className="w-[26%] bg-violet-500 rounded-[12px] border-[1px] border-transparent text-white font-semibold hover:border-violet-600 hover:text-violet-600 hover:bg-transparent transition-400 transition" type="submit">Enter</button>
            </div>
            <label className="py-5 pl-3 inline-block">
              <input type="file" className="choose-input hidden"/>
              <img src={photo} alt="img" className="choose-img" width={100} height={50}/>
            </label>
        </form>
        <div className="w-[50%] mx-auto mt-[8px] flex justify-between p-5 bg-white rounded-[10px]">
            <button  className="all w-[25%] p-[15px] bg-violet-500 rounded-[12px] text-white font-semibold" type="submit">All(<span id="all">0</span>)</button>
            <button className="complated w-[25%] p-[15px] bg-violet-500 rounded-[12px] text-white font-semibold" type="submit">Complated(<span id="complated">0</span>)</button>
            <button className="uncomplated w-[25%] p-[15px] bg-violet-500 rounded-[12px] text-white font-semibold" type="submit">Uncomplated(<span id="uncomplated">0</span>)</button>
        </div>
        <ul className="list w-[50%] mx-auto mt-[10px] p-5 flex flex-col gap-3 bg-white rounded-[10px]">
            {list.map((item,index) => (
                <li className='w-full px-[5px] py-[10px] rounded-md bg-violet-400 flex justify-between items-center '>
                    <div className='flex text-white text-[20px]'>
                        <span>{index + 1}.</span>
                        <p>{item.title}</p>
                    </div>
                    <div className='flex gap-[5px]'>
                        <input type='checkbox'/>
                        <button onClick={() => handleEdit(item)} className='p-3 bg-green-500 rounded-[12px] text-white font-medium'>Update</button>
                        <button onClick={() => handleDelete(item.id)} className='p-3 bg-red-500 rounded-[12px] text-white font-medium'>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
        
        {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-[40%]">
                        <h2 className="text-2xl font-bold text-violet-800 mb-4">Elementni yangilash</h2>
                        <input type="text" value={selectedItem?.title} onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })} className="w-full mb-[10px] p-[12px] outline-none border-[2px] border-violet-300 rounded-[12px] text-violet-400 focus:border-violet-500 focus:shadow-lg" />
                        <div className="flex justify-end">
                            <button onClick={handleUpdate} className="bg-violet-500 hover:bg-white hover:text-violet-500 text-white font-medium py-2 px-4 rounded-md mr-2">Saqlash</button>
                            <button onClick={() => setShowModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md">Bekor qilish</button>
                        </div>
                    </div>
                </div>
        )}
    </>
  )
}
