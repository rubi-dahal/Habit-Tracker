import React, { useState, useEffect } from 'react'
import './App.css'
import Habit from './components/Habit'
import Hero from './components/Hero'

const App = () => {
 
  const getWeekKey = (offset) => {
    const now = new Date()
    const day = now.getDay() 
    const monday = new Date(now)
    monday.setDate(now.getDate() - ((day + 6) % 7) + offset * 7)
    monday.setHours(0, 0, 0, 0)
    return monday.toISOString().slice(0, 10)
  }
  const defaultWeeks = { [getWeekKey(0)]: [] }

  const [weekOffset, setWeekOffset] = useState(0)

  const [weeks, setWeeks] = useState(() => {
    try {
      const rawWeeks = localStorage.getItem('habits_weeks')
      if (rawWeeks) return JSON.parse(rawWeeks)

      const rawOld = localStorage.getItem('habits')
      if (rawOld) {
        const parsed = JSON.parse(rawOld)
        if (Array.isArray(parsed)) {
          const weekKey = getWeekKey(0)
          return { [weekKey]: parsed }
        }
      }

      return defaultWeeks
    } catch (e) {
      return defaultWeeks
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('habits_weeks', JSON.stringify(weeks))
    } catch (e) {
    }
  }, [weeks])

  const currentWeekKey = getWeekKey(weekOffset)

  const todaysKey = getWeekKey(0)

  const todayIndex = (() => {
    const now = new Date()
    const jsDay = now.getDay()
    return jsDay === 0 ? 6 : jsDay - 1
  })()

  const habitsForTodayWeek = weeks[todaysKey] || []

  const todayProgress = habitsForTodayWeek.reduce((count, habit) => {
    return count + (habit.status[todayIndex] ? 1 : 0)
  }, 0)

  const getHabitsForWeek = (key) => weeks[key] || []

  const setHabitsForWeek = (key, array) => {
    setWeeks((prev) => {
      const current = Array.isArray(prev[key]) ? prev[key] : []
      const newArr = typeof array === 'function' ? array(current) : array
      return { ...prev, [key]: newArr }
    })
  }

  useEffect(() => {
    if (!weeks[currentWeekKey]) {
      
      const template = weeks[todaysKey] || Object.values(weeks)[0] || []
      const clone = template.map((h) => ({ name: h.name, status: [false, false, false, false, false, false, false] }))
      setWeeks((prev) => ({ ...prev, [currentWeekKey]: clone }))
    }
  }, [currentWeekKey])

  const addHabitGlobal = (name) => {
    const h = { name, status: [false, false, false, false, false, false, false] }
    setWeeks((prev) => {
      const out = {}
      Object.keys(prev).forEach((k) => {
        out[k] = Array.isArray(prev[k]) ? [...prev[k], { ...h }] : [{ ...h }]
      })
      if (Object.keys(out).length === 0) out[currentWeekKey] = [{ ...h }]
      return out
    })
  }

  const renameHabitGlobal = (oldName, newName) => {
    setWeeks((prev) => {
      const out = {}
      Object.entries(prev).forEach(([k, arr]) => {
        out[k] = arr.map((hb) => (hb.name === oldName ? { ...hb, name: newName } : hb))
      })
      return out
    })
  }

  const deleteHabitGlobal = (nameToDelete) => {
    setWeeks((prev) => {
      const out = {}
      Object.entries(prev).forEach(([k, arr]) => {
        out[k] = arr.filter((hb) => hb.name !== nameToDelete)
      })
      return out
    })
  }

  const toggleCheckboxForWeek = (weekKey, habitIndex, dayIndex) => {
    setHabitsForWeek(weekKey, (arr) =>
      arr.map((habit, i) =>
        i === habitIndex
          ? { ...habit, status: habit.status.map((done, j) => (j === dayIndex ? !done : done)) }
          : habit
      )
    )
  }
  const resetHabits = () => {
    try {
      localStorage.removeItem('habits')
      localStorage.removeItem('habits_weeks')
    } catch (e) {}
    setWeeks({ [getWeekKey(0)]: [] })
    setWeekOffset(0)
  }
  const computeStreak = () => {
    let streak = 0
    let dayOffset = 0
    while (true) {
      const date = new Date()
      date.setDate(date.getDate() - dayOffset)
      const jsDay = date.getDay() 
      const dayIndex = jsDay === 0 ? 6 : jsDay - 1
      const monday = new Date(date)
      monday.setDate(date.getDate() - ((jsDay + 6) % 7))
      monday.setHours(0, 0, 0, 0)
      const key = monday.toISOString().slice(0, 10)

      const wk = weeks[key]
      let dayFilled = false
      if (wk && Array.isArray(wk)) {
        for (let h = 0; h < wk.length; h++) {
          const habit = wk[h]
          if (habit && Array.isArray(habit.status) && habit.status[dayIndex]) {
            dayFilled = true
            break
          }
        }
      }

      if (dayFilled) {
        streak++
        dayOffset++
      } else {
        break
      }
    }
    return streak
  }

  const streak = computeStreak()

  return (
    <div className="App">
      
      <Hero completed={todayProgress} total={habitsForTodayWeek.length} />
      <Habit
        habits={getHabitsForWeek(currentWeekKey)}
        setHabits={(arr) => setHabitsForWeek(currentWeekKey, arr)}
        addHabitGlobal={addHabitGlobal}
        renameHabitGlobal={renameHabitGlobal}
        deleteHabitGlobal={deleteHabitGlobal}
        toggleCheckboxForWeek={(habitIndex, dayIndex) => toggleCheckboxForWeek(currentWeekKey, habitIndex, dayIndex)}
        weekOffset={weekOffset}
        setWeekOffset={setWeekOffset}
        currentWeekKey={currentWeekKey}
        todaysKey={todaysKey}
        streak={streak}
      />
    </div>
  )
}

export default App