import { Route, Routes } from "react-router-dom"

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const RoutesWithNotFonud = ({children}: Props) => {
  return (
    <Routes>
        {children}
        <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  )
}

export default RoutesWithNotFonud
