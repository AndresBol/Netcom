<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/phpmailer/phpmailer/src/Exception.php';
require_once __DIR__ . '/../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/../vendor/phpmailer/phpmailer/src/SMTP.php';

require_once __DIR__ . '/user.php';

class NotificationModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }


    public function all()
    {
        try {
            $vSql = "SELECT 
                n.id,
                n.user_id,
                n.subject,
                n.body,
                n.created_at,
                n.is_active
            FROM notification n
            WHERE n.is_active = 1;";

            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
            return [];
        }
    }   

 

    public function insert($object)
    {

        try {

            if ($object === null) {
                throw new Exception("Object cannot be null");
            }

            if (!isset($object->user_id) || !isset($object->subject) || !isset($object->body)) {
                throw new Exception("Missing required fields: user_id, subject, body");
            }
            $vSql = "INSERT INTO notification (user_id, subject, body, is_active) 
                     VALUES (
                         '" . $object->user_id . "',
                         '" . $object->subject . "',
                         '" . $object->body . "',
                         1
                     );";

            $vResultado = $this->enlace->executeSQL_DML($vSql);

            if ($vResultado) {

                $userModel = new UserModel();

                $user = $userModel->get($object->user_id);

                if ($user && isset($user->email)) {

                    $mail = new PHPMailer(true);

                    try {

                        $mail->isSMTP();

                        $mail->Host = 'smtp.gmail.com';

                        $mail->SMTPAuth = true;

                        $mail->Username = 'bikerstrikersa@gmail.com';

                        $mail->Password = 'pgtt jyqd siff vfbh';

                        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

                        $mail->Port = 587;

                        $mail->setFrom('bikerstrikersa@gmail.com', 'Netcom');

                        $mail->addAddress($user->email);

                        $mail->isHTML(false);

                        $mail->Subject = $object->subject;

                        $mail->Body = $object->body;

                        $mail->send();

                    } catch (Exception $e) {

                        error_log("Email send failed: " . $mail->ErrorInfo);

                    }

                }

            }

            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getByUserId($userId)
    {
        try {
            $vSql = "SELECT 
                n.id,
                n.user_id,
                n.subject,
                n.body,
                n.created_at,
                n.is_active
            FROM notification n
            WHERE n.user_id = $userId AND n.is_active = 1;";

            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado ? $vResultado : [];
        } catch (Exception $e) {
            handleException($e);
            return [];
        }
    }


 
}
