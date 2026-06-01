import React, { useState } from 'react'
import { BiBookmarkAlt } from 'react-icons/bi'
import { FaFire } from 'react-icons/fa'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { IoToday } from 'react-icons/io5'

const Habit = ({
  habits,
  setHabits,
  addHabitGlobal,
  renameHabitGlobal,
  deleteHabitGlobal,
  toggleCheckboxForWeek,
  weekOffset,
  setWeekOffset,
  currentWeekKey,
  todaysKey,
  streak = 0
}) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const [input, setInput] = useState("")
  const [editingIndex, setEditingIndex] = useState(null)
  const [editInput, setEditInput] = useState("")

  const toggleCheckbox = (habitIndex, dayIndex) => {
    if (toggleCheckboxForWeek) return toggleCheckboxForWeek(habitIndex, dayIndex)
    setHabits((prev) =>
      prev.map((habit, i) =>
        i === habitIndex
          ? {
              ...habit,
              status: habit.status.map((done, j) =>
                j === dayIndex ? !done : done
              )
            }
          : habit
      )
    )
  }

  const addHabit = (e) => {
    e.preventDefault()

    if (!input.trim()) return

    if (addHabitGlobal) addHabitGlobal(input)
    else
      setHabits((prev) => [
        ...prev,
        {
          name: input,
          status: [false, false, false, false, false, false, false]
        }
      ])

    setInput("")
  }

  const startEditing = (index, name) => {
    setEditingIndex(index)
    setEditInput(name)
  }

  const saveEdit = (e) => {
    e.preventDefault()

    if (editingIndex === null || !editInput.trim()) return

    if (renameHabitGlobal) {
      const oldName = habits[editingIndex] && habits[editingIndex].name
      if (oldName) renameHabitGlobal(oldName, editInput.trim())
    } else {
      setHabits((prev) =>
        prev.map((habit, index) =>
          index === editingIndex
            ? { ...habit, name: editInput.trim() }
            : habit
        )
      )
    }

    setEditingIndex(null)
    setEditInput("")
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditInput("")
  }

  const deleteHabit = (indexToDelete) => {
    if (deleteHabitGlobal) {
      const name = habits[indexToDelete] && habits[indexToDelete].name
      if (name) deleteHabitGlobal(name)
    } else {
      setHabits((prev) => prev.filter((_, index) => index !== indexToDelete))
    }

    if (editingIndex === indexToDelete) {
      cancelEdit()
    }
  }

  const now = new Date()
  const jsDay = now.getDay() 
  const absoluteTodayIndex = jsDay === 0 ? 6 : jsDay - 1

  const todayProgress = habits.reduce((acc, habit) => {
    return acc + (habit.status[absoluteTodayIndex] ? 1 : 0)
  }, 0)
  const getWeekStart = (offset) => {
    const now = new Date();
    const day = now.getDay(); 
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((day + 6) % 7) + offset * 7);
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const weekStart = getWeekStart(weekOffset || 0);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  return (
    <div className='flex flex-col items-start px-4 sm:px-6 md:px-10 gap-8'>

      <div className='grid grid-cols-1 gap-6 w-full hero-cards'>

        <div className='flex flex-col bg-white rounded-lg p-8 border border-gray-300 gap-1'>
          <p className='font-medium text-green-500 flex items-center gap-2'>
            <IoToday /> Today
          </p>

          <h3 className='font-bold'>
            <span className='text-2xl'>{todayProgress}</span> / {habits.length} habits
          </h3>

          <p className='text-gray-500 text-sm'>
            Track your daily progress
          </p>
        </div>

        <div className='flex flex-col bg-white rounded-lg p-8 border border-gray-300 gap-1'>
          <p className='font-medium text-green-500 flex items-center gap-2'>
            <FaFire /> Streak
          </p>

          <h3 className='font-bold'>
            <span className='text-2xl'>{streak}</span> days
          </h3>

          <p className='text-gray-500 text-sm'>
            Keep the streak going
          </p>
        </div>

        <div className='flex flex-col bg-white rounded-lg p-8 border border-gray-300 gap-1'>
          <p className='font-medium text-green-500 flex items-center gap-2'>
            <BiBookmarkAlt /> Total habits
          </p>

          <h3 className='font-bold'>
            <span className='text-2xl'>{habits.length}</span> active
          </h3>

          <p className='text-gray-500 text-sm'>
            Manage your habits
          </p>
        </div>
      </div>

    
      <div className='flex flex-col w-full border border-gray-300 rounded-lg p-8 bg-white gap-6'>

        <div className='flex justify-between items-center'>
          <h2 className='font-bold text-xl'>Weekly Grid</h2>

          <div className='week-nav flex items-center gap-10 md:gap-4 sm:gap-2 text-sm text-gray-800'>
            <IoMdArrowRoundBack onClick={() => setWeekOffset((w) => w - 1)} className="cursor-pointer hover:text-green-500" aria-label="Previous week" />
            <p className='week-nav-date'>{formatDate(weekStart)} - {formatDate(weekEnd)}</p>
            <IoMdArrowRoundForward onClick={() => setWeekOffset((w) => w + 1)} className="cursor-pointer hover:text-green-500" aria-label="Next week" />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-[2fr_repeat(7,1fr)] gap-2 justify-items-center font-semibold">
              <div></div>
              {days.map((day, idx) => (
                <div
                  key={day}
                  className={
                    "text-center text-sm " +
                    (idx === absoluteTodayIndex && (weekOffset === 0 || weekOffset === undefined) ? 'text-green-600' : '')
                  }
                >
                  {day}
                </div>
              ))}
            </div>

            {habits.map((habit, i) => (
              <div key={i} className="grid grid-cols-[2fr_repeat(7,1fr)] gap-2 items-center py-3 border-b border-gray-100">
                <div className="flex flex-col gap-2 pr-4 font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>

                    {editingIndex === i ? (
                      <form onSubmit={saveEdit} className="flex flex-col items-start gap-2 w-full">
                        <input
                          value={editInput}
                          onChange={(e) => setEditInput(e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <div className="flex gap-2">
                          <button type="submit" className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600">Save</button>
                          <button type="button" onClick={cancelEdit} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <span>{habit.name}</span>
                    )}
                  </div>

                  {editingIndex !== i && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <button type="button" onClick={() => startEditing(i, habit.name)} className="hover:text-green-600">Rename</button>
                      <span>•</span>
                      <button type="button" onClick={() => deleteHabit(i)} className="hover:text-red-600">Delete</button>
                    </div>
                  )}
                </div>

                {habit.status.map((done, idx) => {
                  const isTodayCell = idx === absoluteTodayIndex && (weekOffset === 0 || weekOffset === undefined)
                  return (
                    <div key={idx} className={'flex justify-center ' + (isTodayCell ? 'rounded-md' : '')}>
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => { if (isTodayCell) toggleCheckbox(i, idx) }}
                        disabled={!isTodayCell}
                        className={'w-5 h-5 accent-green-500 ' + (!isTodayCell ? 'cursor-not-allowed' : 'cursor-pointer')}
                      />
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-6 mb-20 w-full'>

      
        <div className='flex flex-col bg-white rounded-lg p-6 border border-gray-300 w-full md:w-1/2'>
          <form onSubmit={addHabit} className='flex gap-3'>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder='Add new habit'
              className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500'
            />

            <button
              type="submit"
              className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600'
            >
              Add
            </button>
          </form>
        </div>
  
        <div className='flex flex-col bg-white rounded-lg p-6 border border-gray-300 w-full md:w-1/2'>
          <h4 className='font-semibold mb-2'>Today’s Progress</h4>

          <div className='w-full bg-gray-200 rounded-full h-2 mb-2'>
            <div
              className='bg-green-500 h-2 rounded-full'
              style={{
                width: `${(todayProgress / habits.length) * 100}%`
              }}
            ></div>
          </div>

          <p className='text-sm text-gray-600'>
            {todayProgress} / {habits.length} completed today
          </p>
        </div>

        <div className='flex flex-col bg-green-100 rounded-lg p-6 border border-green-400 w-full md:w-1/2'>
          <h4 className='font-medium'>
            “Small daily improvements are the key to staggering long-term results.”
          </h4>
          <p className='text-gray-600 text-sm mt-2'>Daily reminder</p>
        </div>

        

      </div>

    </div>
  )
}

export default Habit