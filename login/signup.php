<?php
include '../db_sql/db.php';

$toastMessage = "";
$toastType = "error";

if (isset($db_error) && $db_error) {
    $toastMessage = "Database connection failed.";
} else {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
        $name = trim($_POST['nameInput']);
        $email = trim($_POST['emailInput']);
        $password = trim($_POST['passwordInput']);

        $regexEmail = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/";
        $regexPassword = "/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/";
        $regexname = "/^[a-zA-Z\s]{2,50}$/";

        if (!preg_match($regexname, $name)) {
            $toastMessage = "Invalid name (2-50 letters only).";
        } elseif (!preg_match($regexEmail, $email)) {
            $toastMessage = "Invalid email format.";
        } elseif (!preg_match($regexPassword, $password)) {
            $toastMessage = "Password must be at least 8 chars with letters and numbers.";
        } else {
            try {
                $stmt = $pdo->prepare("SELECT * FROM login_db WHERE email = :email");
                $stmt->execute(['email' => $email]);
                if ($stmt->rowCount() > 0) {
                    $toastMessage = "Email already exists.";
                } else {
                    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                    $stmt = $pdo->prepare("INSERT INTO login_db (name, email, password) VALUES (:name, :email, :password)");
                    $stmt->execute(['name' => $name, 'email' => $email, 'password' => $hashedPassword]);
                    $_SESSION['user_id'] = $pdo->lastInsertId();
                    $_SESSION['user_name'] = $name;
                    $_SESSION['user_email'] = $email;
                    $toastMessage = "Sign up successful! You can now log in.";
                    $toastType = "success";
                    header("Refresh:1; url=../index.php?name=" . urlencode($name));
                }
            } catch (PDOException $e) {
                $toastMessage = "Error: " . addslashes($e->getMessage());
            }
        }
    }
}
$pdo = null;
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  <link rel="stylesheet" href="../css/all.min.css" />
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="login.css">
  <title>Sign Up - Movie Streaming</title>
</head>

<body>
  <button class="btn home"> <a href="../index.html"><i><i class="fa-regular fa-house"></i></i></a></button>
  <div class="login-card">
    <h2>Sign Up</h2>
    <form id="signupForm" method="POST" action="" accept-charset="UTF-8">
      <div class="input-group">
        <input type="text" id="nameInput" name="nameInput" placeholder="Full Name" required>
      </div>
      <div class="input-group">
        <input type="email" id="emailInput" name="emailInput" placeholder="Email or mobile number" required>
      </div>
      <div class="input-group">
        <input type="password" id="passwordInput" name="passwordInput" placeholder="Password" required>
      </div>
      <button type="submit" name="submit" class="login-btn">Sign Up</button>
    </form>

    <div class="signup-text">
      Already have an account? <a href="login.php"><b>Sign in now.</b></a>
    </div>
  </div>
  <div id="toastPopup">
    <i id="toastIcon" class="fas fa-exclamation-circle"></i>
    <div>
      <strong id="toastTitle">Attention</strong>
      <span id="toastMessage">Message </span>
    </div>
  </div>
  <?php if ($toastMessage !== ""): ?>
  <script>
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof showToast === "function") {
      showToast("<?php echo $toastMessage; ?>", "<?php echo $toastType; ?>");
    } else {
      alert("<?php echo $toastMessage; ?>");
    }
  });
  </script>
  <?php endif; ?>

  <script src="signup.js"></script>
</body>

</html>