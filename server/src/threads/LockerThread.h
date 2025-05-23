#ifndef LOCKERTHREAD_H
#define LOCKERTHREAD_H

#include "ILocker.h"

using namespace std;

class LockerThread : public ILocker {
    public:
        // Function 'on' for funcion "lock".
        void on() override;
        // Function 'off' for funcion "unlock".
        void off() override;
};
#endif