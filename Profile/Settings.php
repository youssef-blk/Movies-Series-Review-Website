<!DOCTYPE html>
<html lang="en">

<head>
  <link rel="stylesheet" href="Settings.css">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <nav class="main-nav">
    <div class="nav-logo">SERIES<span>FLIX</span></div>
    <ul class="nav-links">
      <li><a href="index.php">Home</a></li>
      <li><a href="movies.php">Movies</a></li>
      <li><a href="series.php">Series</a></li>
    </ul>
    <div class="nav-actions">
      <a href="logout.php" class="logout-link"><i class="fa-solid fa-right-from-bracket"></i> Exit</a>
    </div>
  </nav>

  <div class="settings-content">
    <div class="settings-section">
      <div class="section-header">
        <h3><i class="fa-solid fa-shield-halved"></i> Account Security</h3>
        <p>Manage your password and keep your account safe.</p>
      </div>

      <form action="update_password.php" method="POST" class="security-form">
        <div class="form-group">
          <label>Current Password</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-key"></i>
            <input type="password" name="old_pass" placeholder="••••••••">
          </div>
        </div>

        <div class="form-group">
          <label>New Password</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-lock"></i>
            <input type="password" name="new_pass" placeholder="••••••••">
          </div>
        </div>

        <button type="submit" class="save-btn">Update Password</button>
      </form>

      <div class="danger-zone">
        <div class="danger-title">Danger Zone</div>
        <p>Once you delete your account, there is no going back. Please be certain.</p>
        <button class="delete-btn"><i class="fa-solid fa-trash-can"></i> Delete Account</button>
      </div>
    </div>
  </div>
</body>

</html>