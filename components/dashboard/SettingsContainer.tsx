import { ReactNode } from "react"

const SettingsContainer = ({children}:{children:ReactNode}) => {
  return (
    <section className="w-83 shrink-0 flex flex-col gap-10 bg-secondary-dark p-5 rounded-3xl">
        {children}
    </section>  
  )
}

export default SettingsContainer