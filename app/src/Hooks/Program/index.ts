import { useEffect, useState } from "react"
import { searchPrograms } from "~/ApiServices/BizApi/program/programIF"

export interface IProgramFilterValues {
  programCode: string
  departmentID: number | string
  name: string
  programStatusCodeID: number | string
  programOfferingName: string
  programOfferingCode: string
}

const INITIAL_FILTER_VALUES: IProgramFilterValues = {
  programCode: "*",
  departmentID: "",
  name: "",
  programStatusCodeID: "",
  programOfferingName: "",
  programOfferingCode: ""
}

export function useSearchFilterState() {
  const [filterData, updateFilterData] = useState<IProgramFilterValues | null>(null)
  return { filterData, updateFilterData, initialData: INITIAL_FILTER_VALUES }
}

export function useSearchProgram(filterData: IProgramFilterValues | null): [boolean, any[]] {
  const [programItems, setProgramItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    ;(async function () {
      if (filterData !== null) {
        setLoading(true)
        const params: { [key: string]: any } = filterData
        const objectKeys = Object.keys(params)
        objectKeys.forEach((key) => {
          if (
            params[key] === undefined ||
            params[key] === null ||
            params[key] === "" ||
            params[key] === "0" ||
            params[key] === 0
          ) {
            delete params[key]
          }
          if (!isNaN(Number(params[key]))) {
            params[key] = Number(params[key])
          }
        })
        const result = await searchPrograms(params)

        if (result && result.success) {
          setProgramItems(result.data)
        }
        setLoading(false)
      }
    })()
  }, [filterData])

  return [loading, programItems]
}
