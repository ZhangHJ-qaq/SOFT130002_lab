# Exercise 7

## Exercise7-1

### Snapshot

![exercise7_1](screenshots\exercise7_1.png)

### Explanation of the code

First, this piece of code creates new PDO object and name it pdo. Then, it sets some attributes of the PDO object. After that, it uses the PDO object to perform a query and print all the gotten artist ids and their corresponding names sequentially in a loop. Finally, it closes the PDO with "$pdo=null".

If any PDOException is thrown during the process, then the program is terminated  and the message is printed.

### Exercise7-2

### Snapshot![exercise7_2](screenshots\exercise7_2.png)

### Explanation of the code

First, this piece of code try to connect to the MYSQL database with

```
$connection = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME)
```

If the connection failed, the program gracefully terminates and a error info is printed on the screen. If the connection success, then continues.

After that, the program perform a query and print all the gotten GenerID and GenreName as options in a select element in a loop, and then release the memory used by the result set. Finally, it closes the connection to the database.

# Exercise8

## Snapshot![exercise8](screenshots\exercise8.png)

## Explanation of three functions

### outputArtists()

This function tries to connect to the database and perform a query to get the info about all artists in the database. Then, it creates a link element for every artist in a loop, with the artist's name in the link and the link pointing to the works of specified artist. 

### outputSinglePainting($row)

This function can print the information of a single painting stored in the variable  $row in given format.

### outputPaintings()

This function first perform a query to get the information about all paintings that belong to the artist specified by the user. Then, it invokes the aforementioned function outputSinglePainting($row) in a loop to print the info about every painting.

# Exercise-9

## The way prepared statements work

Prepared statements basically work like this:

1.Prepare: An SQL statement template is created and sent to the database. Certain values are left unspecified, called parameters (labeled "?"). Example: INSERT INTO MyGuests VALUES(?, ?, ?)
2.The database parses, compiles, and performs query optimization on the SQL statement template, and stores the result without executing it
3.Execute: At a later time, the application binds the values to the parameters, and the database executes the statement. The application may execute the statement as many times as it wants with different values

## The advantages of using prepared statements

1.Prepared statements reduce parsing time as the preparation on the query is done only once (although the statement is executed multiple times)
2.Bound parameters minimize bandwidth to the server as you need send only the parameters each time, and not the whole query
3.Prepared statements are very useful against SQL injections, because parameter values, which are transmitted later using a different protocol, need not be correctly escaped. If the original statement template is not derived from external input, SQL injection cannot occur.