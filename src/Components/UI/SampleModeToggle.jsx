import { ArrowUUpLeft, Eye } from "@phosphor-icons/react";
import { useApplications } from "../../Context/Application_Context";
import Button from "./Button";

/**
 * Switches between the records saved on this device and a read only preview of
 * the sample set. Sample data is never written to storage.
 */
export default function SampleModeToggle() {
  const { sampleMode, showSampleData, showOwnData } = useApplications();

  return (
    <Button
      variant={sampleMode ? "primary" : "secondary"}
      onClick={sampleMode ? showOwnData : showSampleData}
    >
      {sampleMode ? <ArrowUUpLeft size={15} /> : <Eye size={15} />}
      {sampleMode ? "Back to my data" : "View sample data"}
    </Button>
  );
}
