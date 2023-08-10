import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { format } from "date-fns";
import { DownloadCloud } from "lucide-react";
import { CSVLink } from 'react-csv'
import { Data } from 'react-csv/components/CommonPropTypes'

interface DownloadButtonProps extends ButtonProps {
  csvData?: string | Data
  filename: string
}

export function DownloadButton({ csvData, filename, ...props }: DownloadButtonProps) {
  return (
    <Button
      as={CSVLink}
      w="auto"
      h="auto"
      title="Download CSV"
      filename={`${format(new Date(), 'yyyy-MM-dd_HHmm')}_${filename}.csv`}
      data={csvData}
      separator=";"
      variant="outline"
      {...props}
    >
      <Icon as={DownloadCloud} boxSize={4} color="gray.500" />
    </Button>
  )
}