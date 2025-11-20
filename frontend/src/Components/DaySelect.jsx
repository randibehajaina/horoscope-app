

import { useContext } from "react";
import { HoroscopContext } from "../context/HoroscopContext";

 export default function DaySelect() {
  const { day, setDay } = useContext(HoroscopContext);

  return (

    <select
      value={day}
      onChange={(e) => setDay(e.target.value)}
      className="p-2 bg-transparent text-white daySelect"
    >

      <option value="yesterday">Hier</option>
      <option value="today">Aujourd'hui</option>
      <option value="tomorrow">Demain</option>
    </select>

  );
}


