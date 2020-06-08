<?php
session_start();
?>
<html lang="en">
<head>

    <!-- Latest compiled and minified Bootstrap Core CSS -->
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Exercise 11-1 | Using Cookies</title>
</head>

<body>
<header>
</header>


<?php
function getLoginForm()
{
    return "
<form action='' method='post' role='form'>
<div class ='form-group'>
  <label for='username'>Username</label>
  <input type='text' name='username' class='form-control'/>
</div>
<div class ='form-group'>
  <label for='pword'>Password</label>
  <input type='password' name='pword' class='form-control'/>
</div>
<input type='submit' value='Login' class='form-control' />

</form>";
}

function validLogin()
{
    $pdo = new PDO(DBCONNSTRING, DBUSER, DBPASS);
    //very simple (and insecure) check of valid credentials.
    $sql = "SELECT * FROM Credentials WHERE Username=:user and Password=:pass";

    $statement = $pdo->prepare($sql);
    $statement->bindValue(':user', $_POST['username']);
    $statement->bindValue(':pass', $_POST['pword']);
    $statement->execute();
    if ($statement->rowCount() > 0) {
        return true;
    }
    return false;
}

function tryLogin()
{
    $loggedIn = false;
    $message = "";
    if (strtolower($_SERVER['REQUEST_METHOD']) === "post") {
        if (validLogin()) {
            $loggedIn = true;
            $message = "欢迎用户{$_POST['username']}";
            $_SESSION['username'] = $_POST['username'];
            return array("loggedIn" => $loggedIn, "message" => $message);
        }
        $loggedIn = false;
        $message = "登陆失败";
        return array("loggedIn" => $loggedIn, "message" => $message);
    }
    if (isset($_SESSION['username'])) {
        $loggedIn = true;
        $message = "欢迎用户{$_SESSION['username']}";
        return array("loggedIn" => $loggedIn, "message" => $message);

    }
    $loggedIn = false;
    $message = "没有登录请求";
    return array("loggedIn" => $loggedIn, "message" => $message);

}


?>
<div class="container theme-showcase" role="main">
    <div class="jumbotron">
        <h1>
            <?php
            require_once("config.php");
            $loginResult = tryLogin();
            echo $loginResult['message'];

            ?>

        </h1>
    </div>
    <?php
    if (!$loginResult['loggedIn']) {
        echo getLoginForm();
    } else {
        echo "登陆成功";
    }

    ?>
    <button onclick="window.open('logout.php');window.close()">登出</button>
</div>
</body>
</html>
