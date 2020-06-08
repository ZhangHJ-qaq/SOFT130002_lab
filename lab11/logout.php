<?php
session_start();
unset($_SESSION['username']);
header("location:lab11-exercise1.php");