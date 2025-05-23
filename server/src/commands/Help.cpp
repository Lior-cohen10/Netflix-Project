#include "Help.h"
#include "string"
#include "ICommand.h"
#include <iostream>
#include <string>
#include <sstream>
using namespace std;

// This function will takes the input string from the user and show the right format.
string Help::execute(string input) {
    // Check if the input is invalid using the isInvalid function.
    string response;
    if (!isInvalid(input))
    {
        response = "DELETE, arguments: [userid] [movieid1] [movieid2] ...\n"
        "GET, arguments: [userid] [movieid]\n"
        "PATCH, arguments: [userid] [movieid1] [movieid2] ...\n"
        "POST, arguments: [userid] [movieid1] [movieid2] ...\n"
        "help";
    }
    else
        response = "400 Bad Request";

    return response;
}

// This function checks if the input string is invalid.
bool Help::isInvalid(string input) {
    stringstream stream(input);
    string word;
    int count = 0;  

    // Loop through the input string and count the words.
    while (stream >> word)
    {
        count++;
    }
    // If there is only one word in the input, we consider it invalid.
    if (count != 0) {
        return true;
    }
    return false;
}
