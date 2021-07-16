interface Buttons  {
    a: boolean
    b: boolean
    x: boolean
    y: boolean
}

interface Axis {
    x: number
    y: number
}

interface Thumbstick {
    left: Axis
    right: Axis
}

interface SocketResponese {
    thumbsticks: Thumbstick,
    buttons: Buttons,
}


interface SocketContext {
    url: string
    connect: () => any
    payload: SocketResponese
}