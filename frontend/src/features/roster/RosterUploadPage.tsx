import { useState } from "react";
import { useUploadRosterMutation } from "../../api/api";
import {
  Card,
  Text,
  Button,
  FileInput,
  LoadingOverlay,
  Group,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

export default function RosterUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadRoster, { isLoading }] = useUploadRosterMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!file) {
      showNotification({
        title: "Error",
        message: "Please select a file first",
        color: "red",
      });
      return;
    }

    try {
      await uploadRoster(file).unwrap();
      showNotification({
        title: "Success",
        message: "Roster uploaded successfully",
        color: "green",
      });
      setFile(null);
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch {
      showNotification({
        title: "Error",
        message: "Failed to upload roster",
        color: "red",
      });
    }
  };

  return (
    <>
      <Card
        withBorder
        shadow="sm"
        radius="md"
        p="xl"
        style={{ maxWidth: 600, margin: "auto" }}
      >
        <LoadingOverlay visible={isLoading} />
        <Group justify="space-between" mb="md">
          <h3>Upload Roster File</h3>
          <Button 
            variant="subtle" 
            leftSection={<IconArrowLeft size={14} />} 
            onClick={() => navigate("/")}
          >
            Back to Dashboard
          </Button>
          
        </Group>
        <Text color="dimmed" mb="md">
          Supported formats: PDF, Excel, TXT, HTML, Webcal
        </Text>

        <FileInput
          value={file}
          onChange={setFile}
          placeholder="Select roster file"
          accept=".pdf,.xlsx,.xls,.txt,.html,.webcal"
          mb="sm"
        />

        <Button onClick={handleSubmit} disabled={!file || isLoading}>
          Upload
        </Button>
      </Card>
    </>
  );
}