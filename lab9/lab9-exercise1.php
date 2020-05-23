<html>
<head>
    <title>Exercise 1</title>
</head>
<body>
<h1>Regular HTML section (outside &lt;?php ... ?&gt; tags)</h1>
<p>You can type regular HTML here and it will show up</p>

<h1>PHP section (inside &lt;?php ... ?&gt; tags)</h1>
<?php
//this is a php comment IN tags (will not appear)
$d = date("l , F dS , Y H:i:s");
echo "This page was generated " . $d;
echo "</br>";


$isLeapYear = date("L");
if ($isLeapYear) {
    $remainingDays = 366 - date("z");
} else {
    $isLeapYear = 365 - date("z");
}

echo "There are " . $remainingDays . " days in this year!!"
?>
</body>
</html>