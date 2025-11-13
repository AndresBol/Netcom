<?php
class ticket_attachment
{

     public function index()
    {
        try {
            $response = new Response();
            $attachment = new TicketAttachmentModel();
            $result = $attachment->getAll();
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    
    public function getByTimelineId($timelineId)
    {
        try {
            $response = new Response();
            $attachment = new TicketAttachmentModel();
            $result = $attachment->getByTimelineId($timelineId);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }


public function upload()
{
    try {
        $response = new Response();
        $attachment = new TicketAttachmentModel();

        if (!isset($_POST['timeline_id'])) {
            throw new Exception("timeline_id is required");
        }

        $timelineId = $_POST['timeline_id'];

        if (!isset($_FILES['files'])) {
            throw new Exception("No files uploaded");
        }

      
        $uploadDir = __DIR__ . "/../uploads/";

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $uploadedFiles = [];

        foreach ($_FILES['files']['tmp_name'] as $key => $tmpName) {
            $fileName = basename($_FILES['files']['name'][$key]);
            $fileExt = pathinfo($fileName, PATHINFO_EXTENSION);
            $uniqueName = uniqid() . "_" . $fileName;
            $filePath = $uploadDir . $uniqueName;

            if (move_uploaded_file($tmpName, $filePath)) {
                $object = new stdClass();
                $object->timeline_id = $timelineId;
                
                $object->file = "uploads/" . $uniqueName;
                $object->extension = $fileExt;

                $attachment->insert($object);
                $uploadedFiles[] = $object->file;
            }
        }

        $response->toJSON([
            'success' => true,
            'message' => 'Files uploaded successfully',
            'files' => $uploadedFiles,
        
        ]);
    } catch (Exception $e) {
        handleException($e);
    }
}

    
    public function delete($id)
    {
        try {
            $response = new Response();
            $attachment = new TicketAttachmentModel();

            $fileData = $attachment->get($id);
            if (!$fileData) {
                throw new Exception("Attachment not found");
            }

            $filePath = __DIR__ . "/../uploads/". $fileData['file'];
            if (file_exists($filePath)) {
                unlink($filePath);
            }

            $attachment->delete($id);

            $response->toJSON([
                'success' => true,
                'message' => 'Attachment deleted successfully'
            ]);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
