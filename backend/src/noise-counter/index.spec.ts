import {NoiseCounter} from './index'

describe('noise-counters', () => {
    test('call meow once should return meows = 1', () => {
        const noiseCounter = new NoiseCounter()
        noiseCounter.meow()
        expect(noiseCounter.getMeows()).toEqual(1)
    })

    test('call meow twice should return meows = 2', () => {
        const noiseCounter = new NoiseCounter()
        noiseCounter.meow()
        noiseCounter.meow()
        expect(noiseCounter.getMeows()).toEqual(2)
    })

    test('call meow once should return events = 1', () => {
        const noiseCounter = new NoiseCounter()
        noiseCounter.meow()
        expect(noiseCounter.getEvents()).toEqual(1)
    })

    test('call meow twice and wow three times should result in 3 events', () => {
        const noiseCounter = new NoiseCounter()
        noiseCounter.meow()
        noiseCounter.meow()
        noiseCounter.wow()
        noiseCounter.wow()
        noiseCounter.wow()
        expect(noiseCounter.getEvents()).toEqual(3)
    })

    test('call meow twice and wow five times should result in 4  events', () => {
        const noiseCounter = new NoiseCounter()
        noiseCounter.meow()
        noiseCounter.meow()
        noiseCounter.wow()
        noiseCounter.wow()
        noiseCounter.wow()
        noiseCounter.wow()
        noiseCounter.wow()
        expect(noiseCounter.getEvents()).toEqual(4)
    })
})

