<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login/login.php");
    exit();
}
include '../db_sql/db.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <link rel="stylesheet" href="profile.css">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div class="profile-container">
    <div class="profile-card">
      <div class="user-avatar">
        <i class="fa-solid fa-circle-user"></i>
      </div>
      <h2><?php echo $_SESSION['user_name']; ?></h2>
      <p class="email-text">Email: <?php echo $_SESSION['user_email']; ?></p>

      <div class="actions-grid">
        <button class="edit-btn">Update Profile</button>
        <button class="security-btn">Change Password</button>
      </div>

      <div class="my-list-preview">
        <h3>My Playlist</h3>
        <p>You have 0 saved movies.</p>
      </div>
    </div>
  </div>
</body>

</html>