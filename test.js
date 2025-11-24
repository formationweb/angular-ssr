const age = signal(18)


effect(() => {
    console.log(age()) // 18, 20
})

age.set(20)