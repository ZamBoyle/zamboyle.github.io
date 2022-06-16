class Genius {
    public static void main(String[] args) {
        System.out.println("Super Programme de Calcul !\n\n");

        int a = 10;
        int b = 5;

        System.out.println("a = " + a + "\n");
        System.out.println("b = " + b + "\n");
        System.out.println("a + b = " + add(10, 5) + "\n");
        System.out.println("a - b = " + substract(10, 5) + "\n");
    }

    static int add(int number1, int number2) {
        return number1 + number2;
    }

    static int substract(int number1, int number2) {
        return number1 - number2;
    }

}