import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchPrograms } from "~/ApiServices/BizApi/program/programIF"
import { StandardDetailsPage } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { getProgramDetailsMeta } from "~/FormMeta/Program/ProgramDetailsMeta"

export function ProgramDetailsPage(props: RouteComponentProps<{ programID?: string }>) {
  const programID = Number(props?.match?.params?.programID)
  return (
    <StandardDetailsPage
      getDetailsMeta={getProgramDetailsMeta}
      getDetailsFunc={() =>
        searchPrograms({ programID }).then((x) => {
          if (x.success) {
            x.data = x.data[0]
          }
          return x
        })
      }
    />
  )
}
