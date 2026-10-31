import { useApplications } from "../../Context/Application_Context";
import ApplicationDetail from "./ApplicationDetail";
import ApplicationForm from "./ApplicationForm";

/**
 * A single dialog entry point for both pages. One dialog is open at a time,
 * so focus, scroll lock, and Escape handling never stack.
 *
 * In sample mode the dialog is read only: the form is never shown, and the
 * detail view drops its edit and delete actions.
 */
export default function ApplicationDialog({
  dialog,
  onClose,
  onEdit,
  readOnly = false,
}) {
  const { applications } = useApplications();

  if (!dialog) return null;

  if (!readOnly && dialog.type === "create") {
    return <ApplicationForm onClose={onClose} />;
  }

  const application = applications.find((job) => job.id === dialog.id);
  if (!application) return null;

  if (!readOnly && dialog.type === "edit") {
    return (
      <ApplicationForm
        key={`edit-${application.id}`}
        application={application}
        onClose={onClose}
      />
    );
  }

  return (
    <ApplicationDetail
      key={`view-${application.id}`}
      application={application}
      onClose={onClose}
      onEdit={readOnly ? undefined : onEdit}
      readOnly={readOnly}
    />
  );
}
