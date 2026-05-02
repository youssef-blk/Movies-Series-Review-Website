<?php
session_start();
include '../db_sql/db.php';

$toastMessage = "";
$toastType = "error";

if (isset($db_error) && $db_error) {
    $toastMessage = "Database connection failed.";
} else {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
        
        $password = trim($_POST['passwordInput']);
        $email = trim($_POST['emailInput']);

        try {
            $stmt = $pdo->prepare("SELECT * FROM login_db WHERE email = :email");
            $stmt->execute(['email' => $email]);
            if ($stmt->rowCount() === 0) {
                $toastMessage = "Invalid email ";
                $toastType = "error";
            } else {
            $user = $stmt->fetch();
            $virified = password_verify($password, $user['password']);

            if ($user && $virified) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_email'] = $user['email'];

                $toastMessage = "Welcome back, " . $user['name'];
                $toastType = "success";
                header("Refresh:1; url=../index.php?name=" . urlencode($user['name']));
            } else {
                $toastMessage = "Invalid password.";
                $toastType = "error";
            }
        }} catch (PDOException $e) {
            $toastMessage = "Error: " . addslashes($e->getMessage());
        }
    }
}
$pdo = null;
?>
<html lang="en">

<head>
  <link rel="stylesheet" href="../css/bootstrap.min.css">

  <link rel="stylesheet" href="../css/all.min.css" />
  <meta charset="UTF-8">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="login.css">
  <title>Login - Movie Streaming</title>
</head>

<body>
  <button class="btn home"> <a href="../index.php"><i><i class="fa-regular fa-house "
          style="color: white;"></i></i></a></button>
  <div class="login-card">
    <h2>Sign In</h2>
    <form id="loginForm" method="post" action="" accept-charset="UTF-8">
      <div class="input-group">
        <input type="email" id="emailInput" name="emailInput" placeholder="Email or mobile number" required>
      </div>
      <div class="input-group">
        <input type="password" id="passwordInput" name="passwordInput" placeholder="Password" required>
      </div>
      <button type="submit" name="submit" class="login-btn">Sign In</button>
    </form>

    <div class="signup-text">
      New to our site? <a href="signup.php"><b>Sign up now.</b></a>
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
    }
  });
  </script>
  <?php endif; ?>
  <script src="login.js"></script>
</body>

</html>